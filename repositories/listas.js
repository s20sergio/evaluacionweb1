
import { randomUUID } from "node:crypto";
export const toDos = []

export function getListas() {
    return toDos;
  }

 export function getLista(id) {
    return toDos.find((m) => m.id === id) ?? null;
  }

  export function createLista(todo) {
    const newtodo = {
      ...todo,
      id: randomUUID(), 
      completed: false,
    };
    toDos.push(newtodo);
    return newtodo;
  }  

  export function updateLista(id, todo) {
    const listaTodo = getLista(id);
  
    if (!listaTodo) {
      return null;
    }
  
    listaTodo.title = todo.title ?? listaTodo.title;
    listaTodo.completed = todo.completed ?? listaTodo.completed;
    return listaTodo;
  } 

  export function deleteLista(id) {
    const index = toDos.findIndex((m) => m.id === id);
  
    if (index === -1) {
      return false;
    }
  
    toDos.splice(index, 1);
    return true;
  } 