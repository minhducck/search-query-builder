import {
  ArrayComparisonOperator,
  SimpleComparisonOperator,
  FilterType,
} from '../../types';
import simpleFilterParser from './simple-filter-parser';
import {validateRequireFilterField} from '../validator';

export const arrayFilterParser = (
  filterDeclaration: FilterType<ArrayComparisonOperator>
) => {
  validateRequireFilterField(
    filterDeclaration as FilterType<ArrayComparisonOperator>
  );

  if (filterDeclaration?.value?.constructor?.name !== 'Array') {
    throw new Error(
      `The value for ${filterDeclaration.field} must be an array`
    );
  }

  return simpleFilterParser(
    filterDeclaration as FilterType<SimpleComparisonOperator>
  );
};
