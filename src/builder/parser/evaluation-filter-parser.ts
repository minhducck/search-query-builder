import {
  EvaluationOperator,
  FilterType,
  SimpleComparisonOperator,
} from '../../types';
import simpleFilterParser from './simple-filter-parser';
const nonRequireFieldElement = ['$mod', '$regex', '$where', '$jsonSchema', '$text', "$where"];
export const evaluationFilterParser = (
  filterDeclaration: FilterType<EvaluationOperator>
) => {
  if (nonRequireFieldElement.includes(filterDeclaration.operation)) {
    return simpleFilterParser(filterDeclaration as FilterType<SimpleComparisonOperator>, false);
  }

  return simpleFilterParser(
    filterDeclaration as FilterType<SimpleComparisonOperator>
  );
};
