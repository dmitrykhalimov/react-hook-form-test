import { object, string, number } from "yup";

const formSchema = object({
  name: string().min(5, 'Имя пользователя должно быть более 5 символов'),
  age: number().min(0, 'Возраст должен быть больше 0').max(100, 'Возраст должен быть меньше нуля')
})

export { formSchema }