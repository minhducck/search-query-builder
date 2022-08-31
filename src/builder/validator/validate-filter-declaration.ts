import {
  FilterOperationType,
  FilterType,
  isArrayComparisonOperation,
  isLogicalOperation,
} from '../../types';

export const validateFilterDeclaration = (
  filterDeclaration: FilterType<FilterOperationType>
) => {
  // require value
  if (
    !isLogicalOperation(filterDeclaration.operation) &&
    (filterDeclaration?.value === undefined)
  ) {
    throw new Error('Value must be present for your comparison.');
  }

  if (
    isArrayComparisonOperation(filterDeclaration.operation) &&
    !(
      filterDeclaration?.value?.constructor.name === 'Array' &&
      filterDeclaration?.value
    )
  ) {
    throw new Error(
      `The value for ${filterDeclaration.field} must be an array`
    );
  }
};

export default validateFilterDeclaration;
