import { object, string, number } from "yup";

const formSchema = object({
  name: string()
    .required('Требуется указать имя')
    .min(5, 'Имя пользователя должно быть более 5 символов'),
  age: number()
    .required('Требуется указать возраст')
    .min(0, 'Возраст должен быть больше 0')
    .max(100, 'Возраст должен быть меньше 100')
    .typeError('Требуется указать возраст'),
})

export { formSchema }