import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Pagination,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
  Chip,
  Button,
  Link
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import HistoryCard from '../components/History/HistoryCard';
import { historyService } from '../services/historyService';
import { useAuth } from '../hooks/useAuth';
import DeleteConfirmationDialog from '../components/Modals/DeleteConfirmationDialog';
import CustomLoader from '../components/CustomLoader';
import FilterListIcon from '@mui/icons-material/FilterList';
import useStyledSnackbar from '../hooks/useStyledSnackbar';
import DeleteIcon from '@mui/icons-material/Delete';

const ITEMS_PER_PAGE = 6;

const HistoryPage = () => {
  const { t } = useTranslation(['history', 'diagnostic']);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated } = useAuth();
  const { showSuccess, showError } = useStyledSnackbar();
  const [histories, setHistories] = useState([]);
  const [originalHistories, setOriginalHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [filter, setFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        setLoading(true);
        if (isAuthenticated) {
          const data = await historyService.getUserHistory();
          const sortedData = data.sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
          );
          setOriginalHistories(sortedData);
          setHistories(sortedData);
          setTotalPages(Math.ceil(sortedData.length / ITEMS_PER_PAGE));
        }
      } catch (err) {
        showError(t('history:history.load_error'));
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, []);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    
    const filtered = selectedFilter === 'all' 
      ? originalHistories 
      : originalHistories.filter(h => h.predicted_class === selectedFilter);
    
    setHistories(filtered);
    setPage(1);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDeleteClick = (historyId) => {
    setSelectedHistoryId(historyId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await historyService.deleteHistory(selectedHistoryId);
      const updatedHistories = histories.filter(h => h.id !== selectedHistoryId);
      const updatedOriginal = originalHistories.filter(h => h.id !== selectedHistoryId);
      
      setHistories(updatedHistories);
      setOriginalHistories(updatedOriginal);
      setDeleteDialogOpen(false);
      setTotalPages(Math.ceil(updatedHistories.length / ITEMS_PER_PAGE));
      
      if (paginatedHistories.length === 1 && page > 1) {
        setPage(page - 1);
      }
      
      showSuccess(t('history:history.deleted_success'));
    } catch (err) {
      showError(t('history:history.delete_error'));
    } finally {
      setDeleting(false);
    }
  };

 const handleAllDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await historyService.deleteAllHistory(selectedHistoryId);
      setHistories([]);
      setOriginalHistories([]);
      setDeleteAllDialogOpen(false);
      setTotalPages(1);
      setPage( 1);
      showSuccess(t('history:history.deleted_all_success'));
    } catch (err) {
      showError(t('history:history.delete_all_error'));
    } finally {
      setDeleting(false);
    }
  };

  const paginatedHistories = histories.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const uniqueDiseases = [...new Set(originalHistories.map(h => h.predicted_class))];

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '50vh',
        mt: 16
      }}>
        <CustomLoader size={60} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: {xs: 8, md: 14}, pb: 8,
        px: { xs: 4, md: 0},
        background: 'var(--white-color)', 
      }}
    >
    <Container maxWidth="lg">
      <DeleteConfirmationDialog
        locale="history"
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />
      <DeleteConfirmationDialog
        locale="common"
        open={deleteAllDialogOpen}
        onClose={() => setDeleteAllDialogOpen(false)}
        onConfirm={handleAllDeleteConfirm}
        loading={deleting}
      />
       <Box sx={{  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        mb: 4, gap: 2,
      }}>
         <Typography variant="h3" component="h1"  gutterBottom align="center"
          sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif', color: 'var(--dark-text-color)',}}
          >
            {t('history:history.title')}
          </Typography>
        
          <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          width: '100%',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                border: '1px solid',
                borderColor: 'var(--primary-color)',
                color: 'var(--primary-color)',
                backgroundColor: 'white',
                padding: '8px', 
                '&:hover': {
                  backgroundColor: 'var(--primary-color)',
                  borderColor: 'var(--dark-primary-color)',
                  color: 'var(--white-color)',
                }
              }}
            >
              <FilterListIcon sx={{ fontSize: '1.2rem' }} />
            </IconButton>      
            <Chip
              label={filter === 'all' 
                ? t('history:history.showing_all') 
                : t('history:history.showing_filtered')}
              variant="outlined"
              sx={{
                color:"var(--primary-color)",
                backgroundColor:'white',
                fontFamily: '"Inter", sans-serif',
                fontSize: '18px',
                padding: 2.2,
                border: '1px solid var(--primary-color)'
              }}
            />
          </Box>

          <Button
            variant="outlined"
            onClick={() => setDeleteAllDialogOpen(true)}
            startIcon={<DeleteIcon />}
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: '25px',
              border: '1px solid var(--error-color)',
              transition: 'all 0.3s ease',
              paddingY: 1,
              paddingX: 2,
              backgroundColor: 'white',
              color: 'var(--error-color)',
              '&:hover': {
                backgroundColor: 'var(--error-color)',
                color:'var(--white-color)'
              }
            }}
           
          >
            {t('history:history.delete_all')}
            
          </Button>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              borderRadius: '12px', 
              backgroundColor: 'var(--white-color) !important',
              '& .MuiMenuItem-root': {
                color: 'var(--dark-text-color)',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(56, 135, 122, 0.12)',
                  '&:hover': {
                    backgroundColor: 'rgba(56, 135, 122, 0.08)'
                  }
                }
              }
            }
          }}
        >
          <MenuItem 
            onClick={() => handleFilterChange('all')}
            selected={filter === 'all'}
            sx={{
              fontFamily: '"Inter", sans-serif'
            }}
          >
            {t('history:history.filter.all')}
          </MenuItem>
          {uniqueDiseases.map(disease => (
            <MenuItem 
              key={disease} 
              onClick={() => handleFilterChange(disease)}
              selected={filter === disease}
              sx={{
                fontFamily: '"Inter", sans-serif'
              }}
            >
              {t(`diagnostic:xaiMethods.diseaseLabels.${disease}`)}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      
      {histories.length === 0 ? (
        <Box sx={{ 
          p: 8, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center',
          textAlign: 'center', justifyContent: 'center'
        }}>
          <Typography variant="h6" sx={{ 
            fontFamily: '"Inter", sans-serif',
            color: 'var(--grey-text-color)'
          }}>
            {filter === 'all' 
              ? t('history:history.noHistory') 
              : t('history:history.noFilteredHistory')}
          </Typography>
           <Button variant="contained"  size={isMobile ? 'medium' : 'large'}
              sx={{
                width: isMobile ? '160px' : '200px',  py: isMobile ? 1.5 : 2,
                borderRadius: '25px', textTransform: 'none', alignItems: 'center',
                fontWeight: 600, fontSize: isMobile ? '0.9rem' : '1rem',
                backgroundColor: 'var(--primary-color)', color: 'var(--white-color)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'var(--dark-primary-color)',
                  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3)',
                },
                '&:active': { 
                  boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',
                }
              }}
              component={Link}
              href="/diagnostics"
            >
                {t('history:tryButton')}
            </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            mb: 4
          }}>
            <Grid container spacing={isMobile ? 2 : 3} sx={{ 
              maxWidth: '1200px',
              justifyContent: 'center'
            }}>
              {paginatedHistories.map((history) => (
                <Grid item key={history.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HistoryCard 
                      history={history} 
                      onDelete={() => handleDeleteClick(history.id)}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: 4
          }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 500,
                  '&.Mui-selected': {
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'var(--primary-dark)'
                    }
                  },
                  '&.MuiPaginationItem-ellipsis': {
                    border: 'none'
                  }
                }
              }}
            />
          </Box>
        </>
      )}
    </Container>
    </Box>
  );
};

export default HistoryPage;