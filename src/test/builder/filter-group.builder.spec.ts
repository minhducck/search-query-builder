import {filterGroupBuilder} from "../../";

describe('Filter Group Builder Test', () => {
  describe('root', () => {
    it('Test pure Groups => $or conditions', () => {
      expect(filterGroupBuilder([
        {field: "_id", value: "100001", operation: "$gt"},
        {field: "status", value: false, operation: "$ne"},
        {field: "state", value: ['pending', 'on-hold',], operation: "$in"}
      ])).toStrictEqual({
        $or: [
          {"_id": {$gt: "100001"}},
          {"status": {$ne: false}},
          {"state": {$in: ['pending', 'on-hold',]}},
        ]
      });
    });

    it('Filter groups with empty array', () => {
      expect(() => filterGroupBuilder([])).toThrow(Error);
      expect(() => filterGroupBuilder([])).toThrow('The group declaration should be more than 1 item.');
    });

    it('Filter group with 1 filter inside', () => {
      expect(filterGroupBuilder([{field: "_id", value: "1111", operation: "$eq"}])).toStrictEqual({"_id": {$eq: "1111"}})
      expect(filterGroupBuilder([{field: "_id", value: 2222, operation: "$eq"}])).toStrictEqual({"_id": {$eq: 2222}})
      expect(filterGroupBuilder([{field: "status", value: true, operation: "$eq"}])).toStrictEqual({"status": {$eq: true}})
    });
  });
});
