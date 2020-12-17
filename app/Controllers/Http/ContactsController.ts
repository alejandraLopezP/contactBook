import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContactsController {
	
	getContacts() {
		return { hello: 'world' }
	}
}
