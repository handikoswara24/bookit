import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

const allRooms = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const rooms = await Room.find({});

    res.status(200).json({
        success: true,
        count: rooms.length,
        rooms
    })
})

const newRoom = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const room = await Room.create(req.body);

    res.status(200).json({
        success: true,
        room
    });
})

const getSingleRoom = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const room = await Room.findById(req.query.id)

    if (!room) {
        return next(new ErrorHandler("Room not found with this ID", 404));
    }
    res.status(200).json({
        success: true,
        room
    });

})

const updateRoom = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    let room = await Room.findById(req.query.id)

    if (!room) {
        return res.status(400).json({
            success: false,
            error: "Room not found with this ID"
        });
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        room
    });
})

const deleteRoom = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const room = await Room.findById(req.query.id)

    if (!room) {
        return res.status(400).json({
            success: false,
            error: "Room not found with this ID"
        });
    }

    await room.remove();

    res.status(200).json({
        success: true,
        rmessage: "Room has been deleted"
    });
})

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}