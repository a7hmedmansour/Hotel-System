import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function GetResevedRoom(req, res, next) {
	try {
		const ResevedRoom = await prisma.reservedrooms.findMany({
			select: {
				id: true,
				userid: true,
				roomid: true,
				adminid: true,
				startAt: true,
				endAt: true,
			},
		});
		if (ResevedRoom) {
			okResponse(res, "ResevedRoom fetch successfully", ResevedRoom);
		} else {
			return badRequestResponse(res, "Error");
		}
	} catch (err) {
		next();
	}
}
