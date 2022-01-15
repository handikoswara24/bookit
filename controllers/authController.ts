import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

const registerUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const {name, email, password} : any = req.body;

    const user = await User.create({
        name,
        email, 
        password,
        avatar: {
            public_id: "PUBLIC_ID",
            url: "URL"
        }
    })

    res.status(200).json({
        success: true,
        message: "Account Registered Successfully"
    })
})

export {
    registerUser
}