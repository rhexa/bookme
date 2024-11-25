import { useLocation, useParams } from 'react-router-dom'

const ClientFormPage = () => {
  const location = useLocation()
  const { serviceId } = useParams()
  const queryParams = new URLSearchParams(location.search)
  const date = queryParams.get('date')

  return (
    <div>
      <h1>Client Form Page</h1>
      <p>Service ID: {serviceId}</p>
      <p>Date: {date}</p>
    </div>
  )
}

export default ClientFormPage
