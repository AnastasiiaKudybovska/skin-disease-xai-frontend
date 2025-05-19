// HistoryDetailCard.js
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Box } from '@mui/material';
import HistoryDetailCard from '../components/History/HistoryDetailCard';
import DeleteConfirmationDialog from '../components/Modals/DeleteConfirmationDialog';
import { useParams, useNavigate } from 'react-router-dom';
import { historyService } from '../services/historyService';
import CustomLoader from '../components/CustomLoader';
import useStyledSnackbar from '../hooks/useStyledSnackbar';

const HistoryDetailPage = () => {
  const { t } = useTranslation('history');
  const { showSuccess, showError } = useStyledSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [update, setUpdate] = useState(false);
  const methodRefs = useRef({});

  const scrollToMethod = (methodId) => {
    if (methodRefs.current[methodId]) {
      methodRefs.current[methodId].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await historyService.getDetailedHistory(id);
        setHistory(data);
      } catch (err) {
        showError(t('history.load_error'));
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [id, update]);

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await historyService.deleteHistory(id);
      setDeleteDialogOpen(false);
      showSuccess(t('history.deleted_success'));
      navigate('/history');
    } catch (err) {
      showError(t('history.delete_error'));
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '50vh',
        mt: {xs: 16, md: 20}
      }}>
        <CustomLoader size={60} />
      </Box>
    );
  }

  if (!history) {
    return <Box>History not found</Box>;
  }

  return (
    <Box
      sx={{
        py: 8, 
        pb: 8,
        px: { xs: 4, md: 0},
        background: 'var(--white-color)', 
      }}
    >
      <DeleteConfirmationDialog
        locale="history"
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />
      <Container sx={{ pt: 8 }}>
        <Box maxWidth="lg" sx={{ mb: 4 }}>
          <HistoryDetailCard 
            history={history} 
            setDeleteDialogOpen={setDeleteDialogOpen}
            update={update}
            setUpdate={setUpdate}
            scrollToMethod={scrollToMethod}
            methodRefs={methodRefs}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HistoryDetailPage;