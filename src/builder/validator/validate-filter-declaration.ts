import {
  FilterOperationType,
  FilterType,
  isArrayComparisonOperation,
  isLogicalOperation,
} from '../../types';

const nonRequiredFieldOp = ['$and', '$or', '$nor', '$not', '$expr', '$jsonSchema', '$text', '$where'];

export const validateFilterDeclaration = (
  filterDeclaration: FilterType<FilterOperationType>
) => {
  // require value
  if (!nonRequiredFieldOp.includes(filterDeclaration.operation) && !filterDeclaration.field) {
    throw new Error('The field must present for comparison.');
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
