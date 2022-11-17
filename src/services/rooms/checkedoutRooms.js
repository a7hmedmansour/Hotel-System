import { prisma } from "../../index.js";
import {
	badRequestResponse,
	okResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { checkDate, checkOutDate } from "../../helpers/functions/checkDate.js";
export async function checkout(req, res, next) {
	try {
		const { feedback, userid, roomid, endAt } = req.body;
		const { id } = req.user;
		checkDate(res, userid, roomid);
		checkOutDate(res, roomid, userid, endAt);
		const roomdata = await prisma.reservedrooms.findFirst({
			where: {
				roomid: roomid,
			},
		});

		const room = await prisma.rooms.findUnique({
			where: {
				id: roomid,
			},
		});

		//calculate days
		let Startday = new Date(roomdata.startAt);
		let Endday = new Date(endAt);
		let day1 = Startday.getTime();
		let day2 = Endday.getTime();
		let costs =
			Math.round((day2 - day1) / (1000 * 3600 * 24)) * room.Daycost;

		//Do check out
		const checkout = await prisma.checkedoutrooms.create({
			data: {
				userid,
				roomid,
				adminid: id,
				cost: costs,
				feedback,
				startAt: roomdata.startAt,
				endAt: new Date(endAt).toISOString(),
			},
		});

		if (checkout) {
			//change Status
			await prisma.rooms.update({
				where: {
					id: room.id,
				},
				data: {
					Status: "Available",
				},
			});
			await prisma.reservedrooms.delete({
				where: {
					id: roomdata.id,
				},
			});
			return okResponse(res, "checkout done", checkout);
		} else {
			return badRequestResponse(res, "Error");
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
