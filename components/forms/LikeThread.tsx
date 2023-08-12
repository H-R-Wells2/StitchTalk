"use client";

import Image from "next/image";

import {
  addLikeToThread,
  isUserLikedThread,
} from "@/lib/actions/thread.actions";
import { useEffect, useState } from "react";

interface Props {
  threadId: string;
  userId: string;
}

function LikeThread({ threadId, userId }: Props) {
  const [isLiked, setIsLiked] = useState(false);


  const checkUserLike = async()=>{
    const isUserLiked = await isUserLikedThread(JSON.parse(threadId), JSON.parse(userId)) 
    setIsLiked(isUserLiked);
  }

  useEffect(() => {
    checkUserLike()
  }, [])
  

  return (
    <Image
      src={`/assets/${isLiked ? "heart-filled.svg" : "heart-gray.svg"}`}
      alt="like"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={async () => {
        await addLikeToThread(JSON.parse(threadId), JSON.parse(userId));
        checkUserLike();
      }}
    />
  );
}

export default LikeThread;
