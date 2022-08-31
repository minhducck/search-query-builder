import {FilterOperationType, FilterType} from '../types';
import filterBuilder from './filter.builder';

export const filterGroupBuilder = (
  groupFilterDeclaration: FilterType<FilterOperationType>[]
) => {
  if (groupFilterDeclaration.length === 0) {
    throw new Error('The group declaration should be more than 1 item.');
  }
  if (groupFilterDeclaration.length === 1) {
    return filterBuilder(groupFilterDeclaration[0]);
  }

  return filterBuilder({
    operation: '$or',
    value: groupFilterDeclaration.map(subFilterQuery =>
      filterBuilder(subFilterQuery)
    ),
  });
};
