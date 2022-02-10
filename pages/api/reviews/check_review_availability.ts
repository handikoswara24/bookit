import nc from "next-connect";
import { checkReviewAvailability } from "../../../controllers/roomController";
import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(checkReviewAvailability);

export default handler;