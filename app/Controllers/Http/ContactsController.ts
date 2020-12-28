import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact'
import Application from '@ioc:Adonis/Core/Application'

export default class ContactsController {
	
	public async index() {
		return await Contact.all()
	}

	public async lastContact() {
		return await Contact
			.query()
			.orderBy('updated_at', 'desc')
			.limit(5)
	}

	public async favorites() {
		return await Contact
		.query()	
		.where('favorite', true)
	}

	public async store({ request }: HttpContextContract) {
		const data = request.all()
		const img = Buffer.from(data.photo, 'base64')
		img.


		const contact = new Contact()

		contact.name = data.name
		contact.email = data.email
		contact.phone_number = data.phone_number
		contact.photo = data.photo
		contact.favorite = data.favorite

		await contact.save()
	}

	public async show({ request }: HttpContextContract) {
		const id = request.params().id
		return await Contact.findOrFail(id)
	}

	public async update({ request }: HttpContextContract) {
		const id = request.params().id
		const data = request.all()
		const contact = await Contact.findOrFail(id)

		contact.name = data.name
		contact.email = data.email
		contact.phone_number = data.phone_number
		contact.photo = data.photo
		contact.favorite = data.favorite

		await contact.save()
	}

	public async destroy({ request }: HttpContextContract) {
		const id = request.params().id
		const contact = await Contact.findOrFail(id)
		await contact.delete()
	}
}
