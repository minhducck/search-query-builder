import simpleFilterParser from './simple-filter-parser';
import {
  FilterType,
  LogicalOperator,
  SimpleComparisonOperator,
} from '../../types';

export const logicalFilterParser = (
  filterDeclaration: FilterType<LogicalOperator>
) => {
  if (filterDeclaration?.value?.constructor.name !== 'Array') {
    throw new Error(
      `The value for ${filterDeclaration.field} must be an array`
    );
  }

  return simpleFilterParser(
    filterDeclaration as FilterType<SimpleComparisonOperator>,
    false
  );
};
