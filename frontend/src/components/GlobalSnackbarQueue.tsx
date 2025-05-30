// src/components/GlobalSnackbarQueue.tsx

import { Snackbar, Alert } from '@mui/material';
import { useSnackbarQueue } from '../store/useSnackbarQueue';

const GlobalSnackbarQueue = () => {
  const { messages, removeMessage } = useSnackbarQueue();

  return (
    <>
      {messages.map(({ id, message, severity }, index) => (
        <Snackbar
          key={id}
          open={true}
          autoHideDuration={4000}
          onClose={() => removeMessage(id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ top: `${index * 70 + 20}px` }} 
        >
          <Alert
            onClose={() => removeMessage(id)}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default GlobalSnackbarQueue;
