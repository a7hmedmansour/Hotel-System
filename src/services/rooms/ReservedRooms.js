import { prisma } from "../../index.js";
import {
	badRequestResponse,
	okResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { checkDate } from "../../helpers/functions/checkDate.js";
export async function ReservedRoom(req, res, next) {
	try {
		const { userid, roomid, startAt, endAt } = req.body;
		const { id } = req.user;

		checkDate(res, userid, roomid, startAt, endAt);

		//-----------------create room on databas
		const Room = await prisma.reservedrooms.create({
			data: {
				userid,
				adminid: id,
				roomid,
				startAt: new Date(startAt).toISOString(),
				endAt: new Date(endAt).toISOString(),
			},
		});
		if (Room) {
			//after room reserved change status room
			await prisma.rooms.update({
				where: {
					id: roomid,
				},
				data: {
					Status: "Reserved",
				},
			});

			return okResponse(
				res,
				" Welcome , Successfuly Reserved Room Room Data",
				{ Room },
			);
		} else {
			return badRequestResponse(res, "Error on  Reserved Room");
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
