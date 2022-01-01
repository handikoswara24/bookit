import nc from "next-connect";
import { getSingleRoom, updateRoom, deleteRoom } from "../../../controllers/roomController";
import dbConnect from "../../../config/dbConnect";

const handler = nc();

dbConnect();

handler.get(getSingleRoom);

handler.post(updateRoom);

handler.delete(deleteRoom)

export default handler;