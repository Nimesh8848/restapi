
import mongoose from "mongoose";
const MONGODB_URI=process.env.MONGODBURI;
const connect=async()=>{
    const connectionState=mongoose.connection.readyState;
    if(connectionState===1){
        console.log("AlreadyConnected");
        return;
    }
    if(connectionState===2){
        console.log("Connedcting...");
        return;
    }
    try{
        mongoose.connect(MONGODB_URI!,{
            dbName:'restapi',
            bufferCommands:true
        });
        console.log("Connected");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err:any){
        console.log("Error:",err);
        throw new Error("Error:",err);

    }
};
export default connect;