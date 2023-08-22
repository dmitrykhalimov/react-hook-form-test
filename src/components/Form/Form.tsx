import React from 'react';
import { useForm } from "react-hook-form";
import { object, string, number, date, InferType} from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

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
    sex: 'female'
  },
  'Павел': {
    id: 4,
    sex: 'male'
  },
  'Мария': {
    id: 5,
    sex: 'female'
  },
}

const filterBySex = (sex: string): TCoworker => {
  const result = Object.keys(coworkerOptions)
  .filter((name) => coworkerOptions[name].sex === sex)
  .reduce((acc: TCoworker, item) => {
    acc[item] = coworkerOptions[item];
    return acc;
  }, {})
  
  return result;
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

const schema = object({
  name: string().min(5, 'Имя пользователя должно быть более 5 символов'),
  age: number().min(0, 'Возраст должен быть больше 0').max(100, 'Возраст должен быть меньше нуля')
})

function Form() {
  let selectedOptions: TCoworker;

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const currentFilter = watch('filter' as any, 'all'); 

  switch (currentFilter) {
    case('male'):
      selectedOptions = filterBySex('male')
      break;
    case('female'):
      selectedOptions = filterBySex('female')
      break;
    default:
      selectedOptions = coworkerOptions;
  }
  
  const generateCoworkerFields = () => {
    return Object.keys(selectedOptions).map((coworkerName) => {
      const coworkerId = selectedOptions[coworkerName].id
      return <option key={coworkerId} value={coworkerId}>{coworkerName}</option>
    })
  }

  const generateFilterFields = () => {
    return Object.keys(filterOptions).map((radioName) => {
      const {id, name} = filterOptions[radioName]
      return (
        <React.Fragment key={id}>
          <label htmlFor={radioName}>{name}</label>
          <input {...register("filter" as any, { required: true })} type="radio" id={radioName} value={radioName} />
        </React.Fragment>
      )
    })
  }

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Имя</label>
        <input {...register("name")} />
        {errors.name && <p role="alert">{errors.name?.message}</p>}
      </div>
      
      <div>
        <label>Возраст</label>
        <input {...register("age", {valueAsNumber: true})} />
        {errors.age && <p role="alert">{errors.age?.message}</p>}
      </div>

      <div>
        <label>Напарник</label>
        <select {...register("coworker" as any)}>
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