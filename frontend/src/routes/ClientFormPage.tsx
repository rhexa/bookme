import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { _setStep } from '../reducers/step'
import { Box, Button, TextField } from '@mui/material'

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log({
      name: formValues.name.value,
      email: formValues.email.value,
      mobile: formValues.mobile.value,
      serviceId,
      date,
    })
    // TODO: send form data to backend
  }

  useEffect(() => {
    dispatch(_setStep(2))
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
