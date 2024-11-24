/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import User from "@/lib/modals/users";
import {NextResponse} from "next/server";
import { Types } from "mongoose";



export const GET = async () => {
    try {
      await connect();
      const users = await User.find();
      return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (error: any) {
      return new NextResponse("Error in fetching users" + error.message, {
        status: 500,
      });
    }
};

export const POST = async (request: Request) => {
    try {
      const body = await request.json();
      await connect();
      const newUser = new User(body);
      await newUser.save();
  
      return new NextResponse(
        JSON.stringify({ message: "User is created", user: newUser }),
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse("Error in creating user" + error.message, {
        status: 500,
      });
    }
};
export const PATCH =async(request: Request) => {
    try{
        const body = await request.json();
        const {userId,newUsername}=body;
        await connect();
     if(!userId||!newUsername){
        return new NextResponse("Invalid Request",{status:400});

     }
     if(!Types.ObjectId.isValid(userId)){
        return new NextResponse("Invalid User ID",{status:400});

     }
     const updatedUser = await User.findOneAndUpdate(
        {_id: userId},
        {username:newUsername},
        {new: true}
     );
     
     if (!updatedUser) {
        return new NextResponse(
          JSON.stringify({ message: "User not found in the database" }),
          { status: 400 }
        );
      }
      return new NextResponse(
      JSON.stringify({message:"user is updated",user:updatedUser})
      );
    }catch (error: any) {
        return new NextResponse("Error in updating user" + error.message, {
          status: 500,
        });
   }
}
export const DELETE= async(request:Request)=>{
    try {
        const{searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        if(!userId) {
            return new NextResponse("ID or username not found", { status: 400 });
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse("Invalid User ID",{status:400});
    
         }
         await connect();
         const deletedUser=await User.findOneAndDelete(
            new Types.ObjectId(userId)
         );
         if(!deletedUser){
            return new NextResponse(
              JSON.stringify({ message: "User not found in the database" }),
              { status: 400 }
            );
         }
         return new NextResponse(
             JSON.stringify({ message: "User is deleted", user: deletedUser })
         );
    } catch (error:any) {
        return new NextResponse("Error in deleting user" + error.message, {
            status: 500,})
        }
}