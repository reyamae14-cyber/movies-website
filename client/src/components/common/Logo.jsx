import { Box } from '@mui/material';

const Logo = () => {
  return (
    <Box
      component="img"
      src="/zetflix.svg"
      alt="ZetFlix Logo"
      sx={{
        height: '5rem',
        width: 'auto',
        objectFit: 'contain'
      }}
    />
  );
};

export default Logo;