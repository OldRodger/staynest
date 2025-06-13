import type { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import express from "express";
import AppError from "./utils/AppError.ts";
import errorController from "./controllers/error.controller.ts";
import catchAsync from "./utils/catchAsync.ts";
import userRoutes from "./user/user.route.ts";
import hotelRoutes from "./hotel/hotel.route.ts";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));

// API ROUTES
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/hotels", hotelRoutes);

app.use(
  catchAsync(async (req, res) => {
    throw new AppError(
      `Can't find ${req.method.toUpperCase()}: method for ${
        req.originalUrl
      } on this server`,
      404
    );
  })
);

app.use(
  (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    errorController(err, req, res, next);
  }
);

export default app;
