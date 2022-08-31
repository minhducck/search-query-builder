import {Model, PipelineStage} from 'mongoose';
import {DEFAULT_PAGE_SIZE, Pagination, SortingType} from '../types';
import {CalculatePageOffset} from '../helper/calculate-page-offset';

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

  subAggregationPipeLine = subAggregationPipeLine || aggregationPipeLine;
  subAggregationPipeLine.concat({$sort: sorting});
  subAggregationPipeLine.concat({$skip: CalculatePageOffset(pagination)});
  subAggregationPipeLine.concat({$limit: pagination.pageSize});

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
