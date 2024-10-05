class APIFeatures<T> {
  query: T;
  queryStr: Record<string, any>;

  constructor(query: T, queryStr: Record<string, any>) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter(): this {
    const queryObj = { ...this.queryStr };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, (match) => `$${match}`);
    this.query = (this.query as any).find(JSON.parse(queryStr));

    return this;
  }

  sort(): this {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = (this.query as any).sort(sortBy);
    } else {
      this.query = (this.query as any).sort("-createdAt");
    }

    return this;
  }

  limitFields(): this {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = (this.query as any).select(fields);
    } else {
      this.query = (this.query as any).select("-__v");
    }

    return this;
  }

  paginate(): this {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = (this.query as any).skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
