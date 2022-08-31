import FilterBuilder from "../../src/builder/filter.builder";

describe('Filter builder Test', () => {
  describe('root', () => {
    it('Filter Builder with $eq Operation', () => {
      expect(FilterBuilder({field: "_id", value: "100001", operation: "$eq"}))
        .toStrictEqual({"_id": {"$eq": "100001"}});
      expect(FilterBuilder({field: "_id", value: 100001, operation: "$eq"}))
        .toStrictEqual({"_id": {"$eq": 100001}});

      expect(() => FilterBuilder({value: 100001, operation: "$eq"})).toThrow(Error);
      expect(() => FilterBuilder({
        value: 100001,
        operation: "$eq"
      })).toThrow("The field must present for comparison.");
    });

    it('Filter Builder with $ne Operation', () => {
      expect(FilterBuilder({field: "_id", value: "100001", operation: "$ne"}))
        .toStrictEqual({"_id": {"$ne": "100001"}});
      expect(FilterBuilder({field: "_id", value: 100001, operation: "$ne"}))
        .toStrictEqual({"_id": {"$ne": 100001}});
    });

    it('Filter Builder with $gt && $gte Operation', () => {
      expect(FilterBuilder({field: "_id", value: "100001", operation: "$gt"}))
        .toStrictEqual({"_id": {"$gt": "100001"}});
      expect(FilterBuilder({field: "_id", value: 100, operation: "$gte"}))
        .toStrictEqual({"_id": {"$gte": 100}});
    });

    it('Filter Builder with $lt && $lte Operation', () => {
      expect(FilterBuilder({field: "_id", value: "100", operation: "$lt"}))
        .toStrictEqual({"_id": {"$lt": "100"}});
      expect(FilterBuilder({field: "_id", value: 100, operation: "$lte"}))
        .toStrictEqual({"_id": {"$lte": 100}});
    });

    it('Filter Builder with $in && $nin Operation', () => {
      expect(FilterBuilder({field: "_id", value: [1, 2, 3], operation: "$in"}))
        .toStrictEqual({"_id": {"$in": [1, 2, 3]}});
      expect(FilterBuilder({field: "_id", value: [3, 3, 3, 2, 1], operation: "$in"}))
        .toStrictEqual({"_id": {"$in": [3, 3, 3, 2, 1]}});

      expect(FilterBuilder({field: "_id", value: [1, 2, 3], operation: "$nin"}))
        .toStrictEqual({"_id": {"$nin": [1, 2, 3]}});
      expect(FilterBuilder({field: "_id", value: [3, 3, 3, 2, 1], operation: "$nin"}))
        .toStrictEqual({"_id": {"$nin": [3, 3, 3, 2, 1]}});
    });

    it('Filter Builder with Element filters', () => {
      expect(FilterBuilder({field: "_id", value: true, operation: "$exists"})).toStrictEqual({"_id": {"$exists": true}});
      expect(FilterBuilder({field: "_id", value: false, operation: "$exists"})).toStrictEqual({"_id": {"$exists": false}});
      expect(FilterBuilder({field: "qty", value: false, operation: "$exists"})).toStrictEqual({"qty": {"$exists": false}});
      expect(FilterBuilder({field: "qty", value: "double", operation: "$type"})).toStrictEqual({"qty": {"$type": "double"}});
      expect(FilterBuilder({field: "qty", value: "number", operation: "$type"})).toStrictEqual({"qty": {"$type": "number"}});
      expect(FilterBuilder({field: "roles", value: "array", operation: "$type"})).toStrictEqual({"roles": {"$type": "array"}});
      expect(FilterBuilder({field: "createdAt", value: "timestamp", operation: "$type"})).toStrictEqual({"createdAt": {"$type": "timestamp"}});
    });

    it('Filter Builder with evaluation filters', () => {
      expect(FilterBuilder({field: "name", value: "^hello.*ld$", operation: "$regex"})).toStrictEqual({"name": {"$regex": '^hello.*ld$'}});
    });

    it('Array filter without array value', () => {
      expect(() => FilterBuilder({field: "_id", value: "Fail Test", operation: "$in"})).toThrowError(Error)
      expect(() => FilterBuilder({field: "_id", value: "Fail Test", operation: "$in"})).toThrowError(`The value for _id must be an array`)
      expect(() => FilterBuilder({field: "_id", value: "Fail Test", operation: "$nin"})).toThrowError(Error)
      expect(() => FilterBuilder({field: "qty", value: "Fail Test", operation: "$in"})).toThrowError(`The value for qty must be an array`)
    })
  });
});
