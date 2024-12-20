import express from 'express'
import { Service } from '../entity/Service'
import { QueryFailedError } from 'typeorm'
import { clientFormDataSchema } from '../utils/types'
import { BOOKING_EMAIL, emailTransporter } from '../utils/config'
const router = express.Router()

router.get('/', async (_req, res) => {
  res.send(
    await Service.find({
      relations: {
        category: true,
      },
      select: {
        category: {
          name: true,
        },
      },
    })
  )
})

router.get('/', async (_req, res) => {
  res.send(
    await Service.find({
      relations: {
        category: true,
      },
      select: {
        category: {
          name: true,
        },
      },
    })
  )
})

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      res.status(400).send('Invalid ID')
      return
    }

    const service = await Service.findOne({
      relations: {
        category: true,
      },
      select: {
        category: {
          name: true,
        },
      },
      where: { id: id },
    })

    if (!service) {
      res.status(404).send('Service with the given id is not found')
      return
    }

    res.send(service)
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

router.post('/', async (req, res) => {
  try {
    const newService = new Service()
    await Object.assign(newService, req.body)

    await newService.save()
    res.send(newService)
  } catch (error) {
    if (error instanceof QueryFailedError) {
      console.error(error)
      res
        .status(400)
        .json({ parameters: error.parameters, message: error.message })
    }
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const serviceToBeUpdated = await Service.findOne({
      where: { id: id },
      relations: {
        category: true,
      },
    })

    if (!serviceToBeUpdated) {
      res.status(404).send('Service not found')
      return
    }

    await Object.assign(serviceToBeUpdated, req.body)

    const updatedService = await serviceToBeUpdated.save()

    res.send(updatedService.scoped('user'))
  } catch (error) {
    if (error instanceof QueryFailedError) {
      console.error(error)
      res.status(400).send(error.message)
    }
    console.error(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await Service.delete(id)
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

// Booking
router.post('/:id/book', async (req, res) => {
  const serviceId = parseInt(req.params.id)
  const formData = clientFormDataSchema.parse(req.body)

  // Fetch service with corresponding serviceId
  const service = await Service.findOne({
    where: { id: serviceId },
    relations: {
      category: true,
    },
  })

  if (!service) {
    res.status(404).send('Service not found')
    return
  }

  // Prepare email data
  const emailData = {
    name: formData.name,
    email: formData.email,
    mobile: formData.mobile,
    service: {
      name: service.name,
      price: service.price,
      category: service.category.name,
    },
    selectedTime: formData.selectedTime,
  }

  // Send email to admin
  const emailText = `
    New reservation has been made:

    Name: ${emailData.name}
    Email: ${emailData.email}
    Mobile: ${emailData.mobile}
    Service: ${emailData.service.name} (${emailData.service.price})
    Category: ${emailData.service.category}
    Selected Time: ${emailData.selectedTime}
  `
  const mailOptions = {
    from: `${emailData.name} ${emailData.email}`,
    to: BOOKING_EMAIL,
    subject: `You have a new reservation - ${service.name} for ${formData.selectedTime}`,
    text: emailText,
  }

  const costumerEmailText = `
    Dear ${emailData.name},

    Thank you for your reservation for ${emailData.service.name} at ${emailData.selectedTime}.

    Best regards,

    Kirana Wellbeing
  `
  const costumerMailOptions = {
    from: `Kirana Wellbeing <${BOOKING_EMAIL}>`,
    to: emailData.email,
    subject: `Your reservation for ${service.name} at ${formData.selectedTime} has been confirmed`,
    text: costumerEmailText,
  }

  try {
    await emailTransporter.sendMail(mailOptions) // Send email to admin
    res.send(`Reservation has been made successfully`)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error when creating a new reservation: ${error}`)
  }

  try {
    await emailTransporter.sendMail(costumerMailOptions) // Send confirmation email to costumer
  } catch (error) {
    console.error(error)
  }
})

export default router
