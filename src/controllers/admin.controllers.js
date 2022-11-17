import * as admin from "../services/admin/index.js";
import { Router } from "express";
import JoiMiddleware from "../helpers/middleware/joimiddleware.js";
import adminschema from "../helpers/schema/admin.schema.js";
import loginschema from "../helpers/schema/login.schema.js";
import jwtStrategy from "../helpers/strategies/jwtstrategy.js";
import adminStrategy from "../helpers/strategies/jwtadmin.js";
import passport from "passport";
const adminrouter = Router();
adminrouter.post(
	"/register",
	passport.authenticate(adminStrategy, { session: false }),
	JoiMiddleware(adminschema),
	admin.register,
);
adminrouter.post("/login", JoiMiddleware(loginschema), admin.login);
adminrouter.get(
	"/admin",
	passport.authenticate(adminStrategy, { session: false }),
	admin.getadmins,
);
adminrouter.get(
	"/admin/:id",
	passport.authenticate(adminStrategy, { session: false }),
	admin.getadminbyID,
);
adminrouter.post(
	"/logout",
	passport.authenticate(jwtStrategy, { session: false }),
	admin.logout,
);
export default adminrouter;
