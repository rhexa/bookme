import { Button } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { _setStep } from '../reducers/step'

const ServiceSelectionPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_setStep(0))
  }, [])

  return (
    <div>
      <h1>Service Selection Page</h1>
      <Link to="/12345">
        <Button variant="contained">Pick the time</Button>
      </Link>
    </div>
  )
}

export default ServiceSelectionPage
