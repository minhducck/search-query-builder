const simpleComparisonOperations = [
  '$eq',
  '$gt',
  '$gte',
  '$lt',
  '$lte',
  '$ne',
] as const;
export type SimpleComparisonOperator =
  typeof simpleComparisonOperations[number];

const arrayComparisonOperations = ['$in', '$nin'];
export type ArrayComparisonOperator = typeof arrayComparisonOperations[number];

const elementOperations = ['$exists', '$type'];
export type ElementOperator = typeof elementOperations[number];

const logicalOperations = ['$and', '$or', '$nor', '$not'];
export type LogicalOperator = typeof logicalOperations[number];

const evaluationOperations = ['$expr', '$regex', '$text', '$where', '$jsonSchema'];
export type EvaluationOperator = typeof evaluationOperations[number];

const operationTypes = [
  '$exists',
  '$type',
  '$eq',
  '$gt',
  '$gte',
  '$lt',
  '$lte',
  '$ne',
  '$in',
  '$nin',
  '$and',
  '$or',
  '$nor',
  '$not',
  '$expr',
  '$regex',
  '$text',
  '$where',
  '$jsonSchema'
] as const;
export type FilterOperationType = typeof operationTypes[number];

export const isSimpleComparisonOperation = (value: any): boolean =>
  simpleComparisonOperations.includes(value);
export const isArrayComparisonOperation = (value: any): boolean =>
  arrayComparisonOperations.includes(value);
export const isElementComparisonOperator = (value: any): boolean =>
  elementOperations.includes(value);
export const isLogicalOperation = (value: any): boolean =>
  logicalOperations.includes(value);
export const isEvaluationOperator = (value: any): boolean =>
  evaluationOperations.includes(value);

export const isComparisonOperator = (value: any): boolean =>
  operationTypes.includes(value);

export default FilterOperationType;
