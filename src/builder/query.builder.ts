import {Model, PipelineStage} from 'mongoose';
import {DEFAULT_PAGE_SIZE, Pagination, SortingType} from '../types';
import {CalculatePageOffset} from '../helper';

export const queryBuilder = (
  dbModel: Model<any>,
  filter: object,
  sorting: SortingType = {_id: -1},
  pagination: Pagination = {page: 0, pageSize: DEFAULT_PAGE_SIZE},
  aggregationPipeLine: PipelineStage[] = [],
  subAggregationPipeLine: PipelineStage.FacetPipelineStage[] = []
) => {
  const aggregation: PipelineStage[] = [];

  aggregation.push({ $match: filter });
  aggregation.push({ $sort: sorting });
  aggregation.push(...aggregationPipeLine);
  aggregation.push(...subAggregationPipeLine);

  aggregation.push({ $skip: CalculatePageOffset(pagination) });
  pagination.pageSize > 0 && aggregation.push({ $limit: pagination.pageSize });

  return dbModel.aggregate([
    {
      $facet: {
        totalCollectionSize: [{ $count: 'value' }],
        searchResult: aggregation as any,
      },
    },
    {
      $project: {
        searchResult: '$searchResult',
        totalCollectionSize: {
          $first: '$totalCollectionSize',
        },
        totalCountForThisPage: {
          $size: '$searchResult',
        },
      },
    },
    {
      $addFields: {
        totalCollectionSize: '$totalCollectionSize.value',
        totalCountForThisPage: '$totalCountForThisPage',
      },
    },
  ]);
};
