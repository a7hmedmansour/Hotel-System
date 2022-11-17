import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function createRoom(req, res, next) {
	try {
		const { status, Daycost, Type, Description } = req.body;
		const newroom = await prisma.rooms.create({
			data: {
				Status: status,
				Daycost: Daycost,
				Type: Type,
				Description: Description,
			},
		});
		if (newroom) {
			return okResponse(res, "succfully Create Room ", newroom);
		} else {
			return badRequestResponse(res, "error");
		}
	} catch (err) {
		next();
	}
}
