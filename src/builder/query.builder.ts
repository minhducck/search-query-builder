import {Model, PipelineStage} from 'mongoose';
import {DEFAULT_PAGE_SIZE, Pagination, SortingType} from '../types';
import {CalculatePageOffset} from '../helper';

export const queryBuilder = async (
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
  aggregation.push({ $sort: sorting });
  const total = dbModel.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: null,
        sum: { $sum: 1 },
      },
    },
  ]);

  const sum = (await total.exec()).pop()?.sum || 0;

  return (
    await dbModel
      .aggregate([
        {
          $facet: {
            searchResult: aggregation as any,
          },
        },
        {
          $project: {
            searchResult: '$searchResult',
            totalCountForThisPage: {
              $size: '$searchResult',
            },
          },
        },
        {
          $addFields: {
            totalCountForThisPage: '$totalCountForThisPage',
            totalCollectionSize: sum,
          },
        },
      ],
      {
        allowDiskUse: true
      })
      .exec()
  ).pop();
};
