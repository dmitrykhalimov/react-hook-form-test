import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";

type TCoworker = {
  [name: string]: {
    id: number,
    sex: string,
  }
}

type TFilter = {
  [sex: string]: {
    name: string,
    id: number,
  },
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

const filterOptions: TFilter = {
  'all': {
    name: 'Все',
    id: 1
  },
  'male': {
    name: 'Муж',
    id: 2
  },
  'female': {
    name: 'Жен',
    id: 3
  }
}

function Form() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  const generateCoworkerFields = () => {
    return Object.keys(coworkerOptions).map((coworkerName) => {
      const coworkerId = coworkerOptions[coworkerName].id
      return <option key={coworkerId} value={coworkerId}>{coworkerName}</option>
    })
  }

  const generateFilterFields = () => {
    return Object.keys(filterOptions).map((radioName) => {
      const {id, name} = filterOptions[radioName]
      return (
        <React.Fragment key={id}>
          <label htmlFor={radioName}>{name}</label>
          <input {...register("filter", { required: true })} type="radio" id={radioName} value={radioName} />
        </React.Fragment>
      )
    })
  }

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
          {generateCoworkerFields()};
        </select>
      </div>

      <div>
        <label>Фильтр</label>
          {generateFilterFields()}
      </div>

      <input type="submit" value={"Отправить"}/>
    </form>
  )
}

export default Form