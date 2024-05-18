import { scrypt } from 'node:crypto';
import { users }  from '../repositories/users.js';

export function authMiddleware(req, res, next) {


	const authorizationToken = req.get('x-authorization')

	if (!authorizationToken) {
		return res.status(401).send({ error: 'Token de autorización no enviado. Recuerda usar el header X-Authorization' })
	}

	const user = users.find(user => user.token === authorizationToken)

	if (!user) {
		return res.status(401).send('Token inválido')
	}
	req.token=authorizationToken;
	next()
}

export function checkPassword(password, hash) {
	const [salt, key] = hash.split(':')

	return new Promise((resolve) => {
		scrypt(password, salt, 64, (err, derivedKey) => {
			if(err) {
				return resolve(false) // or throw mmm...
			}

			resolve(derivedKey.toString('hex') === key)
		})
	})
}