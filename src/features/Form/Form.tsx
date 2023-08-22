import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { TCoworker} from '../../types/form';

import { filterOptions, coworkerOptions } from './formFields';
import { filterBySex } from './filterBySex';
import { formSchema } from './schema';

const FilterTypes = {
  ALL: 'all',
  MALE: 'male',
  FEMALE: 'female',
}

type FormData = {
  name: string;
  age: number;
  filter: string;
  coworker: string;
};

function Form() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    // нет идей как это быстро пофискить
    resolver: yupResolver<any>(formSchema),
    defaultValues: {
      filter: FilterTypes.ALL,
    }
  });

  let selectedOptions: TCoworker;

  // просмотр фильтра
  const currentFilter = watch('filter'); 

  if (currentFilter === FilterTypes.ALL) {
    selectedOptions = coworkerOptions;
  } else {
    selectedOptions = filterBySex(currentFilter);
  }
  
  // сгенерировать список имен
  const generateCoworkerFields = (): JSX.Element[] => {
    return Object.keys(selectedOptions).map((coworkerName) => {
      const coworkerId = selectedOptions[coworkerName].id
      return <option key={coworkerId} value={coworkerId}>{coworkerName}</option>
    })
  }

  // сгенерировать список фильтров
  const generateFilterFields = (): JSX.Element[] => {
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

  const onSubmit = (data: FormData) => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Имя</label>
        <input type="text" {...register("name")} />
        {errors.name && <p role="alert">{errors.name?.message}</p>}
      </div>
      
      <div>
        <label>Возраст</label>
        <input type="number" {...register("age", {valueAsNumber: true})} />
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