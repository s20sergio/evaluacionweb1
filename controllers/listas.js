import { Router } from "express";
import { authMiddleware } from "../middlewares/middlewares.js";
import { formatoUpdate, formatoInsert } from "../validacionesformato/validaciones.js";
import {
  getLista,
  getListas,
  createLista,
  updateLista,
  deleteLista,
} from "../repositories/listas.js";
import {
  createListaSchema,
  updateListaSchema,
} from "../schemas/index.js";

const router = new Router();

router.get("/todos",authMiddleware, (req, res)  =>  {
	res.send (getListas());
})

router.get("/todos/:id",authMiddleware, (req, res) => {
    const todo = getLista(req.params.id);	
    if (todo) {
        res.send(todo);
      } else {
        res.status(404).json("Actividad no encontrada");
      } 
})


router.post("/todos", authMiddleware, formatoInsert, (req, res) => {
	let lista;

  try {
        lista = createListaSchema.validateSync(req.body, {
      stripUnknown: true,
    });
  } catch (ex) {
    return res.status(400).send(ex);
  }

  res.status(201).send(createLista(lista));
})


router.put("/todos/:id",authMiddleware, formatoUpdate, (req, res) => {
    const id = req.params.id;
    let validatedlista;
  
    try {
      validatedlista = updateListaSchema.validateSync(req.body, {
        stripUnknown: true,
      });
    } catch (ex) {
      return res.status(400).send(ex);
    }
  
    const updatedlista = updateLista(id, validatedlista);
  
    if (updatedlista) {
      res.send(updatedlista);
    } else {
      res.status(404).json("Todo no encontrado");
    }
})


router.delete("/todos/:id",authMiddleware, (req, res) => {
    const id = req.params.id;

    if (deleteLista(id)) {
      res.status(204).send();
    } else {
      res.status(404).json("Actividad no encontrada");
    }
});


export default router;