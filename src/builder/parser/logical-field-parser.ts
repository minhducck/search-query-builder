import simpleFilterParser from './simple-filter-parser';
import {
  FilterType,
  LogicalOperator,
  SimpleComparisonOperator,
} from '../../types';
import {arrayFilterParser} from "./array-field-parser";

export const logicalFilterParser = (
  filterDeclaration: FilterType<LogicalOperator>
) => {
  return arrayFilterParser(
    filterDeclaration as FilterType<SimpleComparisonOperator>,
    false
  );
};
