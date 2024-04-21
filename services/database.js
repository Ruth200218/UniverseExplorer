import connectMongoDB from "../libs/mongodb";

export default async function DB(){
    await connectMongoDB();
    return {
        User: require("../models/user").default,
    }
}