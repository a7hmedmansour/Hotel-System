import { prisma } from "../../index.js";
import { okResponse } from "../../helpers/functions/ResponseHandler.js";
export async function getadmins(req, res, next) {
	try {
		const admins = await prisma.admin.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				phonenum: true,
			},
		});
		if (admins) {
			return okResponse(res, "Admins fetched successfully", admins);
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
