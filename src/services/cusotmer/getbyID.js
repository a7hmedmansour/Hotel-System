import { prisma } from "../../index.js";
import {
	badRequestResponse,
	okResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getcustomerbyID(req, res, next) {
	try {
		const { id } = req.params;
		if (typeof id === "string" && id.trim().length === 0) {
			return badRequestResponse(res, "Invalid ID try");
		}
		const cusotmer = await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				phonenum: true,
			},
		});
		if (cusotmer) {
			return okResponse(res, "customer fetched successfully", cusotmer);
		} else {
			return badRequestResponse(res, "Not found customer ");
		}
	} catch (err) {
		next();
	}
}
