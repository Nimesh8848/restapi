/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import User from "@/lib/modals/users";
import {NextResponse} from "next/server";
import { Types } from "mongoose";
import Category from "@/lib/modals/category";

export const GET=async(request:Request)=>{
   try {
    const {searchParams}=new URL(request.url);
    const userId=searchParams.get('userId');
    if(!userId||Types.ObjectId.isValid(userId)){
        return new NextResponse(
            JSON.stringify({message:'Invalid User ID'}),{status: 400}
        );
    }
    await connect();
    const user=await User.findById(new Types.ObjectId(userId));
    if(!user){
        return new NextResponse(
            JSON.stringify({message:'User not found'}),{status: 404}
        );
    }
     const categories=await Category.find({user:new Types.ObjectId(userId)});
     return new NextResponse(
        JSON.stringify({user,categories}),{status: 200}
     );
   } catch (error:any) {
     return new NextResponse(
        JSON.stringify({message:'Server Error',error}),{status: 500}
     )
   }  
}