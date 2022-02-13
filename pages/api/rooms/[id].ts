import nc from "next-connect";
import { getSingleRoom, updateRoom, deleteRoom } from "../../../controllers/roomController";
import dbConnect from "../../../config/dbConnect";

import onError from "../../../middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from "../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.get(getSingleRoom);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateRoom);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteRoom)

export default handler;