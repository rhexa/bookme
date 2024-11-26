import { Container, Typography } from '@mui/material'
import Header from './components/Header'
import Routes from './routes/Routes'
import Stepper from './components/Stepper'

function App() {
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
        <Stepper />
        <Routes />
      </Container>
    </>
  )
}

export default App
