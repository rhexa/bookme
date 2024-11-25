import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { _setStep } from '../reducers/step'
import { Button } from '@mui/material'

const TimeSelectionPage = () => {
  const { serviceId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_setStep(1))
  }, [])
  return (
    <div>
      <h1>Time Selection Page</h1>
      <p>Service ID: {serviceId}</p>
      <Link to="/12345/book">
        <Button variant="contained">Fill in the details</Button>
      </Link>
    </div>
  )
}

export default TimeSelectionPage
