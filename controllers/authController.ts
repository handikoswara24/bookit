import { NextApiRequest, NextApiResponse } from "next"
import User from "../models/user";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import cloudinary from "cloudinary";

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

export {
    registerUser,
    currentUserProfile,
    updateProfile
}