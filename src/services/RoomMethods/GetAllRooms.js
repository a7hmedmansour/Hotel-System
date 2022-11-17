import { prisma } from "../../index.js";
import { okResponse } from "../../helpers/functions/ResponseHandler.js";
export async function getallrooms(req, res, next) {
	try {
		const Rooms = await prisma.rooms.findMany({
			select: {
				id: true,
				Description: true,
				Status: true,
				Daycost: true,
				Type: true,
			},
		});
		if (Rooms) {
			okResponse(res, "Rooms fetch successfully", Rooms);
		}
	} catch (err) {
		next();
	}
}
