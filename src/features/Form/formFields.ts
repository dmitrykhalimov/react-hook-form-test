import { TCoworker, TFilter} from '../../types/form';

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

export { coworkerOptions, filterOptions };