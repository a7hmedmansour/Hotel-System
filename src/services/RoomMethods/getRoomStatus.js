import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getroom(req, res, next) {
	try {
		//const { Status } = req.params;
		const { Status } = req.query;
		if (typeof Status === "string" && Status.trim().length === 0) {
			return badRequestResponse(res, "Invalid Status");
		} else if (
			Status !== "Available" ||
			Status !== "Reserved" ||
			Status !== "Disabled"
		) {
			return badRequestResponse(
				res,
				"Status must be Available Or Disabled Or Reserved",
			);
		}
		const Room = await prisma.rooms.findMany({
			where: {
				Status: Status,
			},
			select: {
				id: true,
				Description: true,
				Status: true,
				Daycost: true,
				Type: true,
			},
		});
		if (Room) {
			okResponse(res, "Room By Status fetch successfully", Room);
		} else {
			return badRequestResponse(res, "Not Found Room");
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
