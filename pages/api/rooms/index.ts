import nc from "next-connect";
import { allRooms, newRoom } from "../../../controllers/roomController";
import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from "../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.get(allRooms);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).post(newRoom);

export default handler;