import { Box, Container, Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute', // Makes sure it covers everything
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(https://metro.co.uk/wp-content/uploads/2024/01/GettyImages-475352876-8469.jpg?quality=90&strip=all&w=646)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: -1, // Moves it behind all content
        display: 'flex',
        alignItems: 'center' /* Centers vertically the child items*/,
      }}
    >
      {/* Optional Overlay for Better Readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 1,
        }}
      />

      {/* Content Container */}
      <Container
        sx={{
          position: 'relative',
          zIndex: 1, // Ensures content is above overlay
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            animation: 'fadeInUp 1s ease-out',
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(30px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          Welcome to the Employment App
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            animation: 'fadeInUp 1s ease-out',
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(30px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          Job seeking made easy.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
