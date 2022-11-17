import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getroombyid(req, res, next) {
	try {
		const { id } = req.params;
		if (isNaN(Number(id))) {
			return badRequestResponse(res, "Invalid Id");
		}
		const Room = await prisma.rooms.findUnique({
			where: {
				id: parseInt(id),
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
			okResponse(res, "Room fetch successfully", Room);
		} else {
			return badRequestResponse(res, "Not Found Room");
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
