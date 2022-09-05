import {
  ArrayComparisonOperator,
  SimpleComparisonOperator,
  FilterType,
} from '../../types';
import * as _ from 'lodash'
import simpleFilterParser from './simple-filter-parser';

export const arrayFilterParser = (
  filterDeclaration: FilterType<ArrayComparisonOperator>,
  requireValidateField = true
) => {
  filterDeclaration.value = filterDeclaration.value.filter(
    (subExpression:any) => !isNaN(subExpression) || !_.isEmpty(subExpression)
  )

  if (filterDeclaration.value.length === 0) {
    return {}
  }

  return simpleFilterParser(
    filterDeclaration as FilterType<SimpleComparisonOperator>,
    requireValidateField
  );
};
