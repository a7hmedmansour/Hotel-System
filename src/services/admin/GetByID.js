import { prisma } from "../../index.js";
import {
	badRequestResponse,
	okResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getadminbyID(req, res, next) {
	try {
		const { id } = req.params;
		if (isNaN(Number(id))) {
			return badRequestResponse(res, "Invalid ID ");
		}
		const Admin = await prisma.admin.findUnique({
			where: {
				id: parseInt(id),
			},
			select: {
				id: true,
				name: true,
				email: true,
				phonenum: true,
			},
		});
		if (Admin) {
			return okResponse(res, "Admin Fetched Successfully", Admin);
		} else {
			return badRequestResponse(res, "Not Found Admin");
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
