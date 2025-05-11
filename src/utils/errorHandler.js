export const handleApiError = (error) => {
  if (!error.response) {
    return {
      status: 0,
      message: 'network_error',
      originalError: error
    };
  }

  const { status, data } = error.response;
  
  switch (status) {
    case 400:
      return {
        status,
        message: data.detail || 'bad_request',
        originalError: error
      };
    case 401:
      return {
        status,
        message: 'unauthorized',
        originalError: error
      };
    case 403:
      return {
        status,
        message: 'forbidden',
        originalError: error
      };
    case 404:
      return {
        status,
        message: 'not_found',
        originalError: error
      };
    case 500:
      return {
        status,
        message: 'server_error',
        originalError: error
      };
    default:
      return {
        status,
        message: 'unknown_error',
        originalError: error
      };
  }
};