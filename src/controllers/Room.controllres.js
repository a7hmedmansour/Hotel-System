import * as room from "../services/rooms/index.js";
import * as RoomMethods from "../services/RoomMethods/index.js";
import { Router } from "express";
import JoiMiddleware from "../helpers/middleware/joimiddleware.js";
//-------------------createRoom--------------------------------
import createRoom from "../helpers/schema/createRoom.schema.js";
//-------------------ReservedRoom--------------------------------
import ReservedRoomschema from "../helpers/schema/ReservedRooms.schema.js";
import jwtStrategy from "../helpers/strategies/jwtstrategy.js";
import passport from "passport";
//-------------------CheckoutRoom--------------------------------
import checkschema from "../helpers/schema/checkedoutRooms.schema.js";
//---------------------------ExtendPeriod-------------
import ExtendPeriodschema from "../helpers/schema/ExtendPeriod.schema.js";

const roomrouter = Router();
roomrouter.post(
	"/room",
	passport.authenticate(jwtStrategy, { session: false }),
	JoiMiddleware(createRoom),
	room.createRoom,
);
roomrouter.post(
	"/reserve",
	passport.authenticate(jwtStrategy, { session: false }),
	JoiMiddleware(ReservedRoomschema),
	room.ReservedRoom,
);
roomrouter.post(
	"/check",
	passport.authenticate(jwtStrategy, { session: false }),
	JoiMiddleware(checkschema),
	room.checkout,
);
//-----------------------Patch-----------------------
roomrouter.patch(
	"/update",
	passport.authenticate(jwtStrategy, { session: false }),
	JoiMiddleware(ExtendPeriodschema),
	RoomMethods.extendperiod,
);
//-------------------------GetMethod-----------------------
roomrouter.get("/rooms", RoomMethods.getallrooms);
roomrouter.get("/room/:id", RoomMethods.getroombyid);
roomrouter.get("/rooms/?Status", RoomMethods.getroom);
//------------------------------------------------
roomrouter.get("/reserve", room.GetResevedRoom);
roomrouter.get("/reserve/:id", room.getReservedRoombyid);
//--------------------------------------------------
roomrouter.get("/check", room.GetcheckedRoom);
roomrouter.get("/check/:id", room.getcheckedroombyid);
export default roomrouter;
