import React, { FC, useEffect } from 'react';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

const ServiceWorkerWrapper: FC = () => {
  const [showReload, setShowReload] = React.useState(false);
  const [waitingWorker, setWaitingWorker] = React.useState<ServiceWorker | null>(null);

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload();
  };

  return (
    <Snackbar
      open={showReload}
      message="A new version is available!"
      onClick={reloadPage}
      style={{marginBottom: '50px'}}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      action={
        <Button
          color="inherit"
          size="small"
          onClick={reloadPage}
        >
          Reload
        </Button>
      }
    />
  );
}

export default ServiceWorkerWrapper;