import type {Document, Model, Query} from "mongoose";
import type {IQueryString} from "./types.ts";

export default class APIBuilder<T extends Document> {
    private query: Query<T[], T>;
    private queryString: IQueryString;

    constructor(model: Model<T>, queryString: IQueryString) {
        this.query = model.find();
        this.queryString = queryString;
    }

    filter() {
        const queryStringCopy = {...this.queryString};
        const protectedFields = ["sort", "page", "limit", "fields"] as const;
        protectedFields.forEach((field) => delete queryStringCopy[field]);

        let finalQueryStr = JSON.stringify(queryStringCopy)
        console.log(finalQueryStr)
        finalQueryStr = finalQueryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);
        console.log(finalQueryStr);

        this.query.find(JSON.parse(finalQueryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ").trim();
            this.query.sort(sortBy);
        } else {
            this.query.sort("-createdAt");
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ").trim();
            this.query.select(fields);
        } else {
            this.query.select("-__v");
        }
        return this;
    }

    getQuery() {
        return this.query;
    }
}
