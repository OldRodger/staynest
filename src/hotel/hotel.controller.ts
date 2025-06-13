import HandlerFactory from "../utils/handlerFactory.ts";
import Hotel from "./hotel.model.ts";

const handler = new HandlerFactory(Hotel);
export const getAllHotels = handler.getAllDocs();
export const getHotel = handler.getDoc();
