import {
  ElementOperator,
  FilterType,
  SimpleComparisonOperator,
} from '../../types';
import simpleFilterParser from './simple-filter-parser';

export const elementFilterParser = (
  filterDeclaration: FilterType<ElementOperator>
) => {
  return simpleFilterParser(
    filterDeclaration as FilterType<SimpleComparisonOperator>
  );
};
