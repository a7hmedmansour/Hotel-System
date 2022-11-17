import { prisma } from "../../index.js";
import { okResponse } from "../../helpers/functions/ResponseHandler.js";
export async function getcustomers(req, res, next) {
	try {
		const customers = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				phonenum: true,
			},
		});
		if (customers) {
			return okResponse(res, "customers fetched successfully", customers);
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
