import { TCoworker, TFilter} from '../../types/form';
import { coworkerOptions } from '../Form/formFields';

const filterBySex = (sex: string): TCoworker => {
  const result = Object.keys(coworkerOptions)
  .filter((name) => coworkerOptions[name].sex === sex)
  .reduce((acc: TCoworker, item) => {
    acc[item] = coworkerOptions[item];
    return acc;
  }, {})
  
  return result;
}

export {filterBySex}