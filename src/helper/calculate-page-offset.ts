import {Pagination} from '../types';

export const CalculatePageOffset = (paginationSetting: Pagination) =>
  Math.max(0, +paginationSetting.page - 1) * +paginationSetting.pageSize;
