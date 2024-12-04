import { Box, Typography, Stack, Divider, Button } from '@mui/material'
import { useAppSelector } from '../hooks/redux'
import { initialState } from '../reducers/booking'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BookingSuccessPage = () => {
  const navigate = useNavigate()
  const booking = useAppSelector((state) => state.booking)
  const services = useAppSelector((state) => state.services)
  const service = services.find((s) => s.id === parseInt(booking.serviceId))

  const handleClick = () => {
    navigate('/')
  }

  useEffect(() => {
    if (booking === initialState) {
      navigate('/')
    }
  }, [])

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h3" component="h2" gutterBottom>
        Booking Successful!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your booking has been successfully made. Here are the details of your
        booking:
      </Typography>
      <Stack spacing={2} divider={<Divider />}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Name:
          </Typography>
          <Typography variant="body1">{booking.name}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Email:
          </Typography>
          <Typography variant="body1">{booking.email}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Mobile:
          </Typography>
          <Typography variant="body1">{booking.mobile}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Service:
          </Typography>
          <Typography variant="body1">{service?.name}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Date and time:
          </Typography>
          <Typography variant="body1">{booking.selectedTime}</Typography>
        </Box>
      </Stack>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleClick}
        fullWidth
      >
        Get back to the home page
      </Button>
    </Box>
  )
}

export default BookingSuccessPage
