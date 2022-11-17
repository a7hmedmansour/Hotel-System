import * as customer from "../services/cusotmer/index.js";
import joimiddle from "../helpers/middleware/joimiddleware.js";
import cutomerschema from "../helpers/schema/customer.schema.js";
import { Router } from "express";
const router = Router();
router.post("/customer", joimiddle(cutomerschema), customer.register);
router.get("/customers", customer.getcustomers);
router.get("/customerid/:id", customer.getcustomerbyID);
export default router;
