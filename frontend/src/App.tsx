import { Container } from '@mui/material'
import Header from './components/Header'
import Routes from './routes/Routes'

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes />
      </Container>
    </>
  )
}

export default App
