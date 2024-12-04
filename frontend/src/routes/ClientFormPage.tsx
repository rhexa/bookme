import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { _setStep } from '../reducers/step'
import { Box, Button, TextField } from '@mui/material'
import { bookService } from '../services/service'
import { _setBooking } from '../reducers/booking'

const ClientFormPage = () => {
  const [formValues, setFormValues] = useState({
    name: {
      value: '',
      error: false,
      errorMessage: 'Minimum length is 3 characters.',
    },
    email: {
      value: '',
      error: false,
      errorMessage: 'Enter a valid email address.',
    },
    mobile: {
      value: '',
      error: false,
      errorMessage: 'Enter a valid mobile number.',
    },
  })

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { serviceId } = useParams()
  const queryParams = new URLSearchParams(location.search)
  const date = queryParams.get('date')

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const fieldName = name as keyof typeof formValues

    switch (fieldName) {
      case 'name':
        setFormValues({
          ...formValues,
          [fieldName]: {
            value,
            error: value.length < 3,
            errorMessage: 'Minimum length is 3 characters.',
          },
        })
        break
      case 'email':
        setFormValues({
          ...formValues,
          [fieldName]: {
            value,
            error: !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
              value
            ),
            errorMessage: 'Enter a valid email address.',
          },
        })
        break
      case 'mobile':
        setFormValues({
          ...formValues,
          [fieldName]: {
            value,
            error: !/^\d{10,}$/.test(value),
            errorMessage: 'Enter a valid mobile number. E.g. 0412345678',
          },
        })
        break
      default:
        break
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!(serviceId && date)) return

    const bookingData = {
      name: formValues.name.value,
      email: formValues.email.value,
      mobile: formValues.mobile.value,
      serviceId,
      selectedTime: date,
    }

    const response = await bookService(bookingData)

    if (response && response.status === 200) {
      dispatch(_setBooking(bookingData))
      navigate('/booking-success')
    }
  }

  useEffect(() => {
    dispatch(_setStep(2))

    // Redirect to home page if serviceId or date is missing
    if (!(serviceId && date)) {
      navigate('/')
    }
  }, [])

  return (
    <Box sx={{ my: 4 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          type="text"
          label="Name"
          name="name"
          value={formValues.name.value}
          onChange={handleOnChange}
          margin="normal"
          error={formValues.name.error}
          helperText={formValues.name.error && formValues.name.errorMessage}
          fullWidth
        />
        <TextField
          required
          type="email"
          label="Email"
          name="email"
          value={formValues.email.value}
          onChange={handleOnChange}
          margin="normal"
          error={formValues.email.error}
          helperText={formValues.email.error && formValues.email.errorMessage}
          fullWidth
        />
        <TextField
          required
          type="tel"
          label="Mobile"
          name="mobile"
          value={formValues.mobile.value}
          onChange={handleOnChange}
          margin="normal"
          error={formValues.mobile.error}
          helperText={formValues.mobile.error && formValues.mobile.errorMessage}
          fullWidth
        />
        <Button
          disabled={
            formValues.name.value === '' ||
            formValues.name.error ||
            formValues.email.error ||
            formValues.mobile.error
          }
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
          fullWidth
        >
          Book now
        </Button>
      </form>
    </Box>
  )
}

export default ClientFormPage
