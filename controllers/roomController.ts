import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";
import Booking from "../models/booking";
import cloudinary from "cloudinary";

const allRooms = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const resPerPage = 4;
    const roomsCount = await Room.countDocuments();
    const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

    let rooms = await apiFeatures.query;
    const filteredRoomsCount = rooms.length;

    apiFeatures.pagination(resPerPage);
    rooms = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        roomsCount,
        resPerPage,
        filteredRoomsCount,
        rooms
    })
})

const newRoom = catchAsyncErrors(async (req: any, res: NextApiResponse) => {
    const images = req.body.images;

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'bookit/rooms',
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })

    }

    req.body.images = imagesLinks;
    req.body.user = req.user._id

    const room = await Room.create(req.body);

    res.status(200).json({
        success: true,
        room
    })
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

    if(req.body.images){
        for(let i = 0; i < room.images.length; i++){
            await cloudinary.v2.uploader.destroy(room.images[i].public_id);
        }

        let imagesLinks = [];
        const images = req.body.images;

        for (let i = 0; i < images.length; i++) {

            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'bookit/rooms',
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }

        req.body.images = imagesLinks;
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
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
        message: "Room has been deleted"
    });
})

const createRoomReview = catchAsyncErrors(async (req: any, res: NextApiResponse) => {

    const {rating, comment, roomId} = req.body;

    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }
    const room = await Room.findById(roomId);

    const isReviewed = room.reviews.find((r : any) => r.user.toString() == req.user._id.toString());

    if(isReviewed){
        room.reviews.forEach((review : any) => {
            if(review.user.toString() == req.user._id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
        });
    }
    else{
        room.reviews.push(review);
        room.numOfReviews = room.reviews.length;
    }

    room.ratings = room.reviews.reduce((acc : any, item : any) => Number(item.rating) + acc, 0) / room.reviews.length;

    await room.save({ validateBeforeSave : false})

    res.status(200).json({
        success: true
    });
})

const checkReviewAvailability = catchAsyncErrors(async (req: any, res: NextApiResponse) => {
    const { roomId } = req.query;

    const bookings = await Booking.find({user : req.user._id, room : roomId});

    let isReviewAvailable = false;

    if(bookings.length > 0){
        isReviewAvailable = true;
    }

    res.status(200).json({
        success: true,
        isReviewAvailable
    });
})

const allAdminRooms = catchAsyncErrors(async (req: any, res: NextApiResponse) => {

    const rooms = await Room.find();

    res.status(200).json({
        success: true,
        rooms
    });
})

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom,
    createRoomReview,
    checkReviewAvailability,
    allAdminRooms
}