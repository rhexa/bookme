import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { _setStep } from '../reducers/step'
import { Button } from '@mui/material'
import { ScheduleMeeting } from 'react-schedule-meeting'

const TimeSelectionPage = () => {
  const { serviceId } = useParams()
  const dispatch = useDispatch()
  const [selectedTime, setSelectedTime] = useState<Date | null>(null)
  const interval = 15
  const serviceDurationInMinutes = 45
  const intervalInMS = interval * 60 * 1000
  const serviceDurationInMS = serviceDurationInMinutes * 60 * 1000

  // Example timeslots
  // [{
  //   id: 0,
  //   startTime: new Date('2024-11-30T09:00:00'),
  //   endTime: new Date('2024-11-30T10:00:00'),
  // }]
  const availableTimeslots = [1, 2, 3, 4, 5, 6].map((id) => {
    return {
      id,
      startTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          9,
          0,
          0,
          0
        )
      ),
      endTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          17,
          0,
          0,
          0
        )
      ),
    }
  })

  // This is a workaround to make the timeslot not overlap with the ending time
  // Let's say we have a service:
  // - duration of 30 minutes
  // - at interval of 15 minutes,
  // - starting time is 9:00
  // - and ending time is 10:00.
  // Meaning the slots available should be 9:00-9.30, 9:15-9:45, and 9:30-10:00.
  // Without this workaround, it will add another slot at 9:45-10:15 which
  // will overlap with the 10:00 ending time.
  const updatedTimeslots = availableTimeslots.map((t) => {
    t.endTime = new Date(
      new Date().setTime(
        t.endTime.getTime() - (serviceDurationInMS - intervalInMS)
      )
    )
    return t
  })

  useEffect(() => {
    dispatch(_setStep(1))
  }, [])
  return (
    <div>
      <h1>Time Selection Page</h1>
      <p>Service ID: {serviceId}</p>
      <ScheduleMeeting
        availableTimeslots={updatedTimeslots}
        eventDurationInMinutes={interval}
        onStartTimeSelect={({ startTime }) => setSelectedTime(startTime)}
      />
      {selectedTime ? (
        <Link to={`/${serviceId}/book?date=${selectedTime.toString()}`}>
          <Button variant="contained">Fill in the details</Button>
        </Link>
      ) : (
        <Button variant="contained" disabled>
          Fill in the details
        </Button>
      )}
    </div>
  )
}

export default TimeSelectionPage
