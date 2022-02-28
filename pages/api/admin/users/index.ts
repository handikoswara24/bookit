import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";
import { getAdminUsers } from "../../../../controllers/authController";
import { authorizeRoles, isAuthenticatedUser } from "../../../../middlewares/auth";

import onError from "../../../../middlewares/errors";

const handler = nc({onError});

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getAdminUsers)

export default handler;