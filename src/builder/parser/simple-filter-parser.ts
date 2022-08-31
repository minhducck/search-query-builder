import {validateRequireFilterField} from '../validator';
import {Dictionary, FilterType, SimpleComparisonOperator} from '../../types';

export const simpleFilterParser = (
  simpleFilterDeclaration: FilterType<SimpleComparisonOperator>,
  requireValidateField = true
) => {
  requireValidateField && validateRequireFilterField(simpleFilterDeclaration);
  const filter: Dictionary<Dictionary<any>> = {};

  if (simpleFilterDeclaration?.field) {
    filter[simpleFilterDeclaration.field] = {};
    filter[simpleFilterDeclaration.field][simpleFilterDeclaration.operation] =
      simpleFilterDeclaration.value;
  } else {
    /** This case is for declaring logical operation. $and, $not, $or, $nor **/
    filter[simpleFilterDeclaration.operation] = simpleFilterDeclaration.value;
  }

  return filter;
};

export default simpleFilterParser;
