import { Container, Typography } from '@mui/material'
import Header from './components/Header'
import Routes from './routes/Routes'
import Stepper from './components/Stepper'
import { useLocation } from 'react-router-dom'

function App() {
  const { pathname } = useLocation()

  return (
    <>
      <Header />
      <Container>
        <Typography
          variant="h2"
          component="h1"
          textAlign="center"
          sx={{ mt: 4 }}
        >
          Kirana Wellbeing
        </Typography>
        {pathname !== '/booking-success' && <Stepper />}
        <Routes />
      </Container>
    </>
  )
}

export default App
