import Routes from './routes/Routes'
import bookmeLogo from '/bookme.svg'

function App() {
  return (
    <>
      <h1>Welcome to Bookme</h1>
      <img src={bookmeLogo} alt="Bookme logo" />
      <Routes />
    </>
  )
}

export default App
