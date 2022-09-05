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
  const aggregation = dbModel.aggregate(aggregationPipeLine);
  // Append lookup to aggregation pipeline.
  aggregation.match(filter);

  // @ts-ignore
  subAggregationPipeLine = [...aggregationPipeLine, ...subAggregationPipeLine];
  subAggregationPipeLine.push({$sort: sorting});
  subAggregationPipeLine.push({$skip: CalculatePageOffset(pagination)});
  pagination.pageSize > 0 && subAggregationPipeLine.push({$limit: pagination.pageSize});

  const facetObject: PipelineStage.Facet['$facet'] = {
    searchResult: subAggregationPipeLine,
    totalCollectionSize: [{$count: 'value'}],
  };

  aggregation
    .facet(facetObject)
    .project({
      searchResult: '$searchResult',
      totalCollectionSize: {
        $first: '$totalCollectionSize',
      },
      totalCountForThisPage: {
        $size: '$searchResult',
      },
    })
    .addFields({
      totalCollectionSize: '$totalCollectionSize.value',
      totalCountForThisPage: '$totalCountForThisPage',
    });

  return aggregation;
};
