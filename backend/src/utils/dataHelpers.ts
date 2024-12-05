import { Category } from '../entity/Category'
import { Service } from '../entity/Service'

/**
 * Deletes all records in the database tables.
 * Should only be used for testing purposes.
 *
 * @returns A promise that resolves when the operation is complete.
 */
export const clearDatabase = async () => {
  await Category.delete({})
  await Service.delete({})
}

/**
 * Seeds the database with some sample data.
 * Should only be used for testing purposes.
 *
 * Populates the categories table with four categories and then populates the services table with services for each category.
 *
 * @returns A promise that resolves when the operation is complete.
 */
export const seedDatabase = async () => {
  const categories = [
    { name: 'chiropractic' },
    { name: 'massage' },
    { name: 'physiotherapy' },
    { name: 'osteopathy' },
  ]

  await Category.insert(categories)

  const services = [
    {
      name: 'Chiropractic Adjustment',
      price: 50.0,
      duration: '30 minutes',
      categoryName: 'chiropractic',
    },
    {
      name: 'Chiropractic Consultation',
      price: 75.0,
      duration: '60 minutes',
      categoryName: 'chiropractic',
    },
    {
      name: 'Chiropractic Exam',
      price: 100.0,
      duration: '90 minutes',
      categoryName: 'chiropractic',
    },
    {
      name: 'Massage Therapy',
      price: 60.0,
      duration: '60 minutes',
      categoryName: 'massage',
    },
    {
      name: 'Deep Tissue Massage',
      price: 80.0,
      duration: '90 minutes',
      categoryName: 'massage',
    },
    {
      name: 'Sports Massage',
      price: 100.0,
      duration: '120 minutes',
      categoryName: 'massage',
    },
    {
      name: 'Physiotherapy Session',
      price: 80.0,
      duration: '60 minutes',
      categoryName: 'physiotherapy',
    },
    {
      name: 'Physiotherapy Consultation',
      price: 100.0,
      duration: '90 minutes',
      categoryName: 'physiotherapy',
    },
    {
      name: 'Physiotherapy Exam',
      price: 120.0,
      duration: '120 minutes',
      categoryName: 'physiotherapy',
    },
    {
      name: 'Osteopathic Treatment',
      price: 100.0,
      duration: '90 minutes',
      categoryName: 'osteopathy',
    },
    {
      name: 'Osteopathic Consultation',
      price: 120.0,
      duration: '120 minutes',
      categoryName: 'osteopathy',
    },
    {
      name: 'Osteopathic Exam',
      price: 150.0,
      duration: '150 minutes',
      categoryName: 'osteopathy',
    },
  ]

  for (const service of services) {
    const category = await Category.findOne({
      where: { name: service.categoryName },
    })
    if (!(category instanceof Category)) {
      throw new Error(`Category not found: ${service.categoryName}`)
    }

    const newService = new Service()
    newService.name = `${service.name} (${service.duration})`
    newService.price = service.price
    newService.category = category
    await newService.save()
    console.log(`${newService.name} added`)
  }
}
