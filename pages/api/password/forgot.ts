import nc from "next-connect";
import { forgotPassword } from "../../../controllers/authController";
import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.post(forgotPassword);

export default handler;