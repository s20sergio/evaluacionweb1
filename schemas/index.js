import { setLocale } from "yup";
import { es } from "yup-locales";
import { object, string, boolean } from "yup";

setLocale(es);

export const createListaSchema = object({
  title: string().required(),
 
});

export const updateListaSchema = object({
  title: string().optional(),
  completed: boolean().optional(),
}); 

export const loginuser = object({
  username: string().optional(),
  password: string().optional(),
}); 