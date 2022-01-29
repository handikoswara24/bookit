import Booking from "../models/booking";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

const newBooking = catchAsyncErrors(async (req : any, res : any) => {
    const  {
        room, checkInDate, checkOutDate, daysOfStay, amountPaid, paymentInfo
    } = req.body;

    const booking = await Booking.create({
        room,
        user: req.user._id,checkInDate, checkOutDate, daysOfStay, amountPaid, paymentInfo,
        paidAt: Date.now()
    });

    res.status(200).json({
        success: true,
        booking
    })
});

const checkRoomBookingAvailability = catchAsyncErrors(async (req, res) => {
    let {roomId, checkInDate, checkOutDate} = req.query;

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);

    const booking = await Booking.find({
        room: roomId,
        $and: [{
            checkInDate: {
                $lte: checkOutDate
            }
        }, {
            checkOutDate : {
                $gte: checkInDate
            }
        }]
    });

    let isAvailable;

    if(booking && booking.length == 0){
        isAvailable = true;
    }
    else{
        isAvailable = false;
    }

    res.status(200).json({
        success: true,
        isAvailable
    })

});

export {
    newBooking, 
    checkRoomBookingAvailability
}