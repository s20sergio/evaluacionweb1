

export const users = [{
	username: 'admin',
	name: 'Gustavo Alfredo Marín Sáez',
	password: '1b6ce880ac388eb7fcb6bcaf95e20083:341dfbbe86013c940c8e898b437aa82fe575876f2946a2ad744a0c51501c7dfe6d7e5a31c58d2adc7a7dc4b87927594275ca235276accc9f628697a4c00b4e01' // certamen123
}]

//valida nombre de usuario de login
export function valUser(username) {
    return  users.find(user => user.username === username) ?? null;
  }

  //valida password del login




// Desloguear a un Usuario en base al token de autenticación
export const logout = (token) => {
  const index = users.findIndex(user => user.token === token);
  if (index !== -1) {
     users[index].token = undefined;
  }
};
