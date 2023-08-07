"use server"


import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose"

interface Params{
    text: string,
    author: string,
    communityId: string | null,
    path: string
}

export async function createThread({
    text, author, communityId, path
}:Params){
    try {
        connectToDb();

    const createdThread = await Thread.create({
        text,
        author,
        community: null
    });

    await User.findByIdAndUpdate(author,{
        $push:{threads: createdThread._id}
    })

    revalidatePath(path);
    } catch (error:any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
    
}