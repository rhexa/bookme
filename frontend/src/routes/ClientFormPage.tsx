import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { _setStep } from '../reducers/step'

const ClientFormPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { serviceId } = useParams()
  const queryParams = new URLSearchParams(location.search)
  const date = queryParams.get('date')

  useEffect(() => {
    dispatch(_setStep(2))
  }, [])
  return (
    <div>
      <h1>Client Form Page</h1>
      <p>Service ID: {serviceId}</p>
      <p>Date: {date}</p>
    </div>
  )
}

export default ClientFormPage
