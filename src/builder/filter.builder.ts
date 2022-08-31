import {
  ArrayComparisonOperator,
  FilterOperationType,
  isArrayComparisonOperation,
  isLogicalOperation,
  isSimpleComparisonOperation,
  LogicalOperator,
  SimpleComparisonOperator,
  FilterType,
  isElementComparisonOperator,
  isEvaluationOperator,
  EvaluationOperator,
} from '../types';
import {
  evaluationFilterParser,
  arrayFilterParser,
  elementFilterParser,
  logicalFilterParser,
  simpleFilterParser,
} from './parser';
import {validateFilterDeclaration} from './validator';

export const filterBuilder = (
  filterDeclaration: FilterType<FilterOperationType>
) => {
  validateFilterDeclaration(filterDeclaration);

  if (isSimpleComparisonOperation(filterDeclaration.operation)) {
    return simpleFilterParser(
      filterDeclaration as FilterType<SimpleComparisonOperator>
    );
  }

  if (isArrayComparisonOperation(filterDeclaration.operation)) {
    return arrayFilterParser(
      filterDeclaration as FilterType<ArrayComparisonOperator>
    );
  }

  if (isLogicalOperation(filterDeclaration.operation)) {
    return logicalFilterParser(
      filterDeclaration as FilterType<LogicalOperator>
    );
  }

  if (isElementComparisonOperator(filterDeclaration.operation)) {
    return elementFilterParser(
      filterDeclaration as FilterType<LogicalOperator>
    );
  }

  if (isEvaluationOperator(filterDeclaration.operation)) {
    return evaluationFilterParser(
      filterDeclaration as FilterType<EvaluationOperator>
    );
  }

  return {};
};

export default filterBuilder;
