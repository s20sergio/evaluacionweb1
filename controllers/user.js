import { Router } from "express";
import { loginuser } from '../schemas/index.js';
import {  valUser , logout} from '../repositories/users.js';
import { formatologin } from "../validacionesformato/validaciones.js";
import { checkPassword, authMiddleware } from "../middlewares/middlewares.js";
import { randomBytes } from "node:crypto";

const router =  Router();

router.post('/login', formatologin,  async (req, res)  => {
	let userValSchema;
    try {
        userValSchema=loginuser.validateSync(req.body,{
        stripUnknown: true,
      });
    } catch(ex) {
      return res.status(400).send(ex);
    }
       const { username, password } = req.body;
       const user = valUser(username); 
    
       if (!user) {
        return res.status(401).send('Usuario y/o password incorrectos');
      }
  
      if (!( await checkPassword(password, user.password))) {
        return res.status(401).send({error: 'Usuario y/o password incorrectos'
        })
      }
      
      user.token = randomBytes(48).toString('hex')
  
      res.send({
          username: user.username,
          name: user.name,
          token: user.token
      })
	
	
})


//al presionar boton logout
router.post('/logout', authMiddleware, (req, res) => {
    logout(req.token);
    res.status(204).send();
  });
export default router;