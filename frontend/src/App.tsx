import { Container } from '@mui/material'
import Header from './components/Header'
import Routes from './routes/Routes'
import Stepper from './components/Stepper'

function App() {
  return (
    <>
      <Header />
      <Container>
        <Stepper />
        <Routes />
      </Container>
    </>
  )
}

export default App
