import nc from "next-connect";
import { allRooms } from "../../../controllers/roomController";

const handler = nc();

handler.get(allRooms);

export default handler;