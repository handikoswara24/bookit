import next, { NextApiRequest, NextApiResponse } from "next"
import User from "../models/user";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler";
import absoluteUrl from "next-absolute-url";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const registerUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "bookit/avatars",
        width: "150",
        crop: "scale"
    })

    const { name, email, password }: any = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.url
        }
    })

    res.status(200).json({
        success: true,
        message: "Account Registered Successfully"
    })
})

const currentUserProfile = catchAsyncErrors(async (req: any, res: NextApiResponse) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
})

const updateProfile = catchAsyncErrors(async (req: any, res: NextApiResponse) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name;
        user.email = req.body.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        if(req.body.avatar){
            const image_id = user.avatar.public_id;
            await cloudinary.v2.uploader.destroy(image_id);

            const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "bookit/avatars",
                width: "150",
                crop: "scale"
            })

            user.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        await user.save();
    }

    res.status(200).json({
        success: true
    })
})

const forgotPassword = catchAsyncErrors(async (req: any, res: NextApiResponse, next : any) => {
    const user = await User.findOne({email : req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found with this email", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave : false});

    const {origin} = absoluteUrl(req);

    const resetUrl = `${origin}/password/reset/${resetToken}`;

    const message = `Your password reset url is as follow \n\n ${resetUrl} \n
    If you have not requested this email, then ignore it`;

    try {
        await sendEmail({
            email : user.email,
            subject : "Bookit Password Recovery",
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to : ${user.email}`
        })
    } catch (error : any) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;

        await user.save({validateBeforeSave : false});

        return next(new ErrorHandler(error.message, 500));
    }

})

const resetPassword = catchAsyncErrors(async (req: any, res: NextApiResponse, next : any) => {

    const resetPasswordToken = crypto.createHash("sha256").update(req.query.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {
            $gt: Date.now()
        }
    });

    if(!user){
        return next(new ErrorHandler("Password reset token is invalid or has been expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password updated successfully"
    })

})

const getAdminUsers = catchAsyncErrors(async (req: any, res: NextApiResponse) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

const getUserDetails = catchAsyncErrors(async (req: any, res: NextApiResponse, next: any) => {
    const user = await User.findById(req.query.id);

    if(!user){
        return next(new ErrorHandler("User not found with this ID.", 400));
    }

    res.status(200).json({
        success: true,
        user
    })
})

const updateUser = catchAsyncErrors(async (req: any, res: NextApiResponse, next: any) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })
})

const deleteUser = catchAsyncErrors(async (req: any, res: NextApiResponse, next: any) => {
    const user = await User.findById(req.query.id);

    if(!user){
        return next(new ErrorHandler("User not found with this ID.", 400));
    }

    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    await user.remove();

    res.status(200).json({
        success: true,
        user
    })
})

export {
    registerUser,
    currentUserProfile,
    updateProfile,
    forgotPassword,
    resetPassword,
    getAdminUsers,
    getUserDetails,
    updateUser,
    deleteUser
}