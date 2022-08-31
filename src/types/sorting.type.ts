import {SortDirectionEnum} from '../enum/sort-direction.enum';

export interface SortingType {
  [FieldName: string]: SortDirectionEnum;
}
