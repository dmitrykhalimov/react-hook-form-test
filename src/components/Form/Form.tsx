import React from 'react';
import { useForm } from "react-hook-form";

type TCoworker = {
  [name: string]: {
    id: number,
    sex: string,
  }
}

type TFilter = {
  [sex: string]: string,
}

const coworkerOptions: TCoworker = {
  'Андрей': {
    id: 1,
    sex: 'male'
  },
  'Сергей': {
    id: 2,
    sex: 'male'
  },
  'Ирина': {
    id: 3,
    sex: 'male'
  },
  'Павел': {
    id: 4,
    sex: 'male'
  },
  'Мария': {
    id: 5,
    sex: 'male'
  },
}

function Form() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Имя</label>
        <input defaultValue="test" {...register("name")} />
      </div>
      
      <div>
        <label>Возраст</label>
        <input defaultValue="test" {...register("age")} />
      </div>

      <div>
        <label>Напарник</label>
        <select {...register("coworker")}>
          {Object.keys(coworkerOptions).map((key) => {
            const coworkerId = coworkerOptions[key].id
            return <option key={coworkerId} value={coworkerId}>{key}</option>
          })}
        </select>
      </div>

      <div>
        <label>Фильтр</label>

        <label htmlFor="all">Все</label>
        <input {...register("filter", { required: true })} type="radio" id="all" value="all" />
        <label htmlFor="male">Муж</label>
        <input {...register("filter", { required: true })} type="radio" id="male" value="male" />
        <label htmlFor="female">Жен</label>
        <input {...register("filter", { required: true })} type="radio" id="female" value="female" />
      </div>

      <input type="submit" value={"Отправить"}/>
    </form>
  )
}

export default Form