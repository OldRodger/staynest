import { model, Schema } from "mongoose";
import type { HotelDocument, IHotel } from "../utils/types.ts";

const hotelSchema = new Schema<IHotel>(
  {
    name: {
      type: String,
      required: [true, "Please enter hotel name"],
    },
    summary: {
      type: String,
      required: [true, "Please enter hotel summary"],
    },
    description: {
      type: String,
      required: [true, "Please enter hotel description"],
    },
    averagePrice: {
      type: Number,
      required: [true, "Please enter hotel averagePrice"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Hotel = model<HotelDocument>("hotel", hotelSchema);

export default Hotel;
