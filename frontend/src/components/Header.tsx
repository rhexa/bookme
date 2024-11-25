import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
} from '@mui/material'
import logo from '/bookme.svg'
import banner from '/banner.jpg'

const Header = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '80vh',
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        objectFit: 'cover',
        backgroundPosition: 'center top 30%',
      }}
    >
      <Container>
        <AppBar
          position="relative"
          color="default"
          sx={{
            top: 25,
          }}
        >
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img
                src={logo}
                alt="Bookme Logo"
                style={{ width: 40, height: 40 }}
              />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Bookme
            </Typography>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  )
}

export default Header
