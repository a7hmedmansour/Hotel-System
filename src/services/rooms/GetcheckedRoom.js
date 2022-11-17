import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function GetcheckedRoom(req, res, next) {
	try {
		const checkedRoom = await prisma.checkedoutrooms.findMany({
			select: {
				id: true,
				feedback: true,
				cost: true,
				roomid: true,
				adminid: true,
				startAt: true,
				endAt: true,
			},
		});
		if (checkedRoom) {
			okResponse(res, "checkedRoom fetch successfully", checkedRoom);
		} else {
			return badRequestResponse(res, "Error");
		}
	} catch (err) {
		next();
	}
}
