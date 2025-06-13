import type { Document, Model } from "mongoose";
import catchAsync from "./catchAsync.ts";
import AppError from "./AppError.ts";
import APIBuilder from "./builder.ts";

export default class HandlerFactory<T extends Document> {
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  public getAllDocs() {
    return catchAsync(async (req, res) => {
      const builderQuery = new APIBuilder(this.model, {
        ...req.query,
      } as Record<string, string>)
        .limitFields()
        .filter()
        .sort()
        .getQuery();
      const docs = await builderQuery;

      return res.status(200).json({
        status: "success",
        results: docs.length,
        docs,
      });
    });
  }

  public getDoc() {
    return catchAsync(async (req, res) => {
      const doc = await this.model.findById(req.params.id);

      if (!doc)
        throw new AppError(
          `Can't find ${this.model.modelName} with that ID`,
          404
        );

      return res.status(200).json({
        status: "success",
        doc,
      });
    });
  }
}
