// Middleware para validad formato
export function formatologin(req, res, next) {
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string' || username.trim() === '' || password.trim() === '') {
        return res.status(400).send("username y/o password no correctos");
    }
    next();
}

export function formatoUpdate(req, res, next) {
    const { title, completed} = req.body;
   
	 if (title !== undefined && typeof title !== 'string') {
	  return res.status(400).send("datos en formato incorrecto");
	}
	if (completed !== undefined && typeof completed !== 'boolean') {
	  return res.status(400).send("datos en formato incorrecto");
	}
    next();
}

export function formatoInsert(req, res, next) {
    const title = req.body.title; 
	 
	// Validar los formatos de title y completed
	if (title !== undefined && typeof title !== 'string') {
	  return res.status(400).send("datos en formato incorrecto");
    }
    next();
}