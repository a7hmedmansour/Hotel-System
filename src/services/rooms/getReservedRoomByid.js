import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getReservedRoombyid(req, res, next) {
	try {
		const { id } = req.params;
		if (isNaN(Number(id))) {
			return badRequestResponse(res, "Invalid Id");
		}
		const ReservedRoom = await prisma.reservedrooms.findUnique({
			where: {
				id: parseInt(id),
			},
			select: {
				id: true,
				userid: true,
				roomid: true,
				adminid: true,
				startAt: true,
				endAt: true,
			},
		});
		if (ReservedRoom) {
			okResponse(res, "ReservedRoom fetch successfully", ReservedRoom);
		} else {
			return badRequestResponse(res, "Not found ReservedRoom");
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
