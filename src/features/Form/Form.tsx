import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { TCoworker } from "../../types/form";

import { filterOptions, coworkerOptions, FilterTypes } from "./formFields";
import { filterBySex } from "./filterBySex";
import { formSchema } from "./schema";

import "./form.scss";

type FormData = {
  name: string;
  age: number;
  filter: string;
  coworker: string;
};

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    // нет идей как это быстро пофискить
    resolver: yupResolver<any>(formSchema),
    defaultValues: {
      filter: FilterTypes.ALL,
    },
  });

  let selectedOptions: TCoworker;

  // просмотр фильтра
  const currentFilter = watch("filter");

  selectedOptions =
    currentFilter === FilterTypes.ALL
      ? coworkerOptions
      : (selectedOptions = filterBySex(currentFilter));

  // сгенерировать список имен
  const generateCoworkerFields = (): JSX.Element[] => {
    return Object.keys(selectedOptions).map((coworkerName) => {
      const coworkerId = selectedOptions[coworkerName].id;
      return (
        <option key={coworkerId} value={coworkerId}>
          {coworkerName}
        </option>
      );
    });
  };

  // сгенерировать список фильтров
  const generateFilterFields = (): JSX.Element[] => {
    return Object.keys(filterOptions).map((radioName) => {
      const { id, name } = filterOptions[radioName];
      return (
        <div className="form__radio-item" key={id}>
          <input
            {...register("filter", { required: true })}
            type="radio"
            id={radioName}
            value={radioName}
          />
          <label htmlFor={radioName}>{name}</label>
        </div>
      );
    });
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__group">
        <label>Имя</label>
        <input type="text" {...register("name")} />
        {errors.name && (
          <p className="form__alert" role="alert">
            {errors.name?.message}
          </p>
        )}
      </div>

      <div className="form__group">
        <label>Возраст</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && (
          <p className="form__alert" role="alert">
            {errors.age?.message}
          </p>
        )}
      </div>

      <div className="form__group">
        <label>Напарник</label>
        <select {...register("coworker")}>{generateCoworkerFields()};</select>
      </div>

      <div className="form__group">
        <label>Фильтр</label>
        <div className="form__radio-group">{generateFilterFields()}</div>
      </div>

      <input className="form__submit" type="submit" value="Отправить" />
    </form>
  );
}

export default Form;
