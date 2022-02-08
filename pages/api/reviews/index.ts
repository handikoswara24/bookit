import nc from "next-connect";
import { allRooms, createRoomReview, newRoom } from "../../../controllers/roomController";
import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(createRoomReview);

export default handler;