import mongoose from "mongoose";

const dbConnect = () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    //@ts-ignore
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => console.log("Conencted to database"))
}

export default dbConnect;