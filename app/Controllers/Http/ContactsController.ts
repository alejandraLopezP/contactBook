import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact'
import * as fs from "fs"
import Application from '@ioc:Adonis/Core/Application'

export default class ContactsController {
	//Method for get all contacts
	public async index() {
		return await Contact.all()
	}
	//Method for get the last 5 contacts
	public async lastContact() {
		return await Contact
			.query()
			.orderBy('updated_at', 'desc')
			.limit(5)
	}
	//Method for get the favorites contacts		
	public async favorites() {
		return await Contact
		.query()	
		.where('favorite', true)
	}
	//Method for SAVE contacts  at the Data Base
	public async store({ request }: HttpContextContract) {
		const data = request.all()
		const contact = new Contact()
		if(data.photo !== null && data.photo.length > 0) {
			let block = data.photo.split(';')
			let realData = block[1].split(',')[1]

			const img = Buffer.from(realData, 'base64')
			
			const path = Application.publicPath('img')+'/'+data.photoName
			fs.writeFileSync(path, img)
			contact.photo = '/img/'+data.photoName
		}

		contact.name = data.name
		contact.email = data.email
		contact.phone_number = data.phone_number
		contact.favorite = data.favorite
		await contact.save()
	}
	//Method for show a specific contact 
	public async show({ request }: HttpContextContract) {
		const id = request.params().id
		return await Contact.findOrFail(id)
	}
	//Method for get the last 5 contacts
	public async update({ request }: HttpContextContract) {
		const id = request.params().id
		const data = request.all()
		const contact = await Contact.findOrFail(id)

		if(data.photo !== null && data.photo.length > 80) {
			let block = data.photo.split(';')
			let realData = block[1].split(',')[1]
			const img = Buffer.from(realData, 'base64')
			const path = Application.publicPath('img')+'/'+data.photoName
			fs.writeFileSync(path, img)
			contact.photo = '/img/'+data.photoName
		}
		contact.name = data.name
		contact.email = data.email
		contact.phone_number = data.phone_number
		contact.favorite = data.favorite

		await contact.save()
	}
	//Method for DELETE a specific contact
	public async destroy({ request }: HttpContextContract) {
		const id = request.params().id
		const contact = await Contact.findOrFail(id)
		await contact.delete()
	}
}
