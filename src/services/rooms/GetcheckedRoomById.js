import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getcheckedroombyid(req, res, next) {
	try {
		const { id } = req.params;
		if (isNaN(Number(id))) {
			return badRequestResponse(res, "Invalid Id");
		}
		const checkedRoom = await prisma.checkedoutrooms.findUnique({
			where: {
				id: parseInt(id),
			},
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
			okResponse(res, " checkedRoom fetch successfully", checkedRoom);
		} else {
			return badRequestResponse(res, "Not found  checkedRoom");
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
