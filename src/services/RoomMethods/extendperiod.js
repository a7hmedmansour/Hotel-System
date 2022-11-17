import { prisma } from "../../index.js";
import {
	badRequestResponse,
	okResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { checkDate, checkOutDate } from "../../helpers/functions/checkDate.js";
export async function extendperiod(req, res, next) {
	try {
		console.log(req.body);
		const { userid, roomid, endAt } = req.body;
		const { id } = req.user;
		checkDate(res, userid, roomid, endAt);
		checkOutDate(res, roomid, userid);
		const reservedroom = await prisma.reservedrooms.findMany({
			where: {
				userid,
				roomid: roomid,
			},
		});
		if (reservedroom.startAt > endAt) {
			return badRequestResponse(res, "invalid Date Must After Start Day");
		} else if (!reservedroom) {
			return badRequestResponse(res, "invalid Request don't find Room");
		}
		const extened = await prisma.reservedrooms.updateMany({
			where: {
				roomid,
			},
			data: {
				endAt: new Date(endAt).toISOString(),
				adminid: id,
				userid,
			},
		});
		if (extened) {
			return okResponse(res, "OK ,Extend period of stay ");
		} else {
			return badRequestResponse(res, "Sory , Error  happened ");
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
