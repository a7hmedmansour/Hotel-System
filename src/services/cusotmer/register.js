import { prisma } from "../../index.js";
import {
  badRequestResponse,
  okResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function register(req, res, next) {
  try {
    const { id, name, phonenumber, email } = req.body;
    const customer = await prisma.user.findUnique({
      where: {
        id,
        //phonenum: phonenumber,
      },
    });
    const customer2 = await prisma.user.findFirst({
      where: {
        //phonenum: phonenumber,
        OR: [{ id }, { phonenum: phonenumber }, { email }],
        // admin: { email, phonenum },
      },
    });
    if (customer) {
      return badRequestResponse(res, "Id  already exist please use athor Id ");
    } else if (customer2) {
      return badRequestResponse(
        res,
        "phonenumber or email  already exist please use athor phonenumber Or Email"
      );
    }
    const newcustomer = await prisma.user.create({
      data: {
        id,
        name,
        email,
        phonenum: phonenumber,
      },
    });
    if (newcustomer) {
      return okResponse(res, "succufly register , welcome", newcustomer);
    } else {
      return badRequestResponse(res, "error");
    }
  } catch (err) {
    next();
  }
}
