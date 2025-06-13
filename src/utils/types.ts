import type { Document } from "mongoose";

export interface IQueryString {
  sort?: string;
  page?: string;
  limit?: string;
  fields?: string;
}

// USER
export interface IUser {
  [key: string]: Record<string, any>;
}

export type UserDocument = IUser & Document;

// HOTEL
export interface IHotel {
  [key: string]: Record<string, any>;
}

export type HotelDocument = IHotel & Document;
