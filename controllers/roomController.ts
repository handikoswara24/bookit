import { NextApiRequest, NextApiResponse } from "next"
import Room from "../models/room";

const allRooms = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const rooms = await Room.find({});

        res.status(200).json({
            success: true,
            count: rooms.length,
            rooms
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const newRoom = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const room = await Room.create(req.body);

        res.status(200).json({
            success: true,
            room
        });
    }
    catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getSingleRoom = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const room = await Room.findById(req.query.id)

        if (!room) {
            return res.status(400).json({
                success: false,
                error: "Room not found with this ID"
            });
        }
        res.status(200).json({
            success: true,
            room
        });
    }
    catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const updateRoom = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
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
    }
    catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const deleteRoom = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
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
    }
    catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}