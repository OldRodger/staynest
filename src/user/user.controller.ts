import catchAsync from "../utils/catchAsync.ts";
import HandlerFactory from "../utils/handlerFactory.ts";
import User from "./user.model.ts";

const factory = new HandlerFactory(User);

export const getAllUsers = factory.getAllDocs();
export const getUser = factory.getDoc();
