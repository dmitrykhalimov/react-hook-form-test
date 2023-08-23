import { TCoworker, TFilter} from '../../types/form';

const FilterTypes = {
  ALL: 'all',
  MALE: 'male',
  FEMALE: 'female',
} as const;


const coworkerOptions: TCoworker = {
  'Андрей': {
    id: 1,
    sex: FilterTypes.MALE
  },
  'Сергей': {
    id: 2,
    sex: FilterTypes.MALE
  },
  'Павел': {
    id: 3,
    sex: FilterTypes.MALE
  },
  'Ирина': {
    id: 4,
    sex: FilterTypes.FEMALE
  },
  'Мария': {
    id: 5,
    sex: FilterTypes.FEMALE
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

export { coworkerOptions, filterOptions, FilterTypes };