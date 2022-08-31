import {FilterType} from '../../types';

export const validateRequireFilterField = (
  filterDeclaration: FilterType<any>
) => {
  if (!filterDeclaration?.field) {
    throw new Error('The field must present for comparison.');
  }
  return true;
};

export default validateRequireFilterField;
