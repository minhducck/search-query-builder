import {
  EvaluationOperator,
  FilterType,
  SimpleComparisonOperator,
} from '../../types';
import simpleFilterParser from './simple-filter-parser';

export const evaluationFilterParser = (
  filterDeclaration: FilterType<EvaluationOperator>
) => {
  if (['$mod', '$regex'].includes(filterDeclaration.operation)) {
    return simpleFilterParser(filterDeclaration as FilterType<SimpleComparisonOperator>, false);
  }

  return simpleFilterParser(
    filterDeclaration as FilterType<SimpleComparisonOperator>
  );
};
