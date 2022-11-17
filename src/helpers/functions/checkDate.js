import { prisma } from "../../index.js";
import {
	unAuthorizedResponse,
	badRequestResponse,
	notFoundResponse,
} from "./ResponseHandler.js";
export async function checkDate(res, userid, roomid, startAt, endAt) {
	//check user found or not and room by id
	const user = await prisma.user.findUnique({
		where: {
			id: userid,
		},
	});
	if (!user) {
		return unAuthorizedResponse(res, "Erro , Not Found User");
	}
	const room = await prisma.rooms.findUnique({
		where: {
			id: roomid,
		},
	});
	if (!room) {
		return badRequestResponse(res, "Erro , Not Found Room");
	}
	if (startAt > endAt) {
		return badRequestResponse(
			res,
			"invaild Data End day must After Start Day",
		);
	}
}
export async function checkOutDate(res, roomid, userid, endAt) {
	const roomdata = await prisma.reservedrooms.findFirst({
		where: {
			roomid: roomid,
		},
	});
	if (!roomdata) {
		return notFoundResponse(res, "Erro , Not Reserved Room");
	}
	if (roomdata.userid !== userid) {
		return unAuthorizedResponse(
			res,
			"Erro , user Id Not Reserved this Room",
		);
	}
	if (roomdata.startAt > endAt) {
		return badRequestResponse(
			res,
			"invaild Data End day must After Start Day",
		);
	}
}
