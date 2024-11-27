import { CircularProgress, Backdrop } from '@mui/material';

type LoadingProps = {
  isLoading: boolean;
}

function Loading({ isLoading }: LoadingProps) {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
