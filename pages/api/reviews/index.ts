import nc from "next-connect";
import { allRooms, createRoomReview, deleteReview, getRoomReviews, newRoom } from "../../../controllers/roomController";
import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from "../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(createRoomReview);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getRoomReviews);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteReview);

export default handler;