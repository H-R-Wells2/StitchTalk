"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  addLikeToThread,
  isUserLikedThread,
} from "@/lib/actions/thread.actions";
import { useState } from "react";

interface Props {
  threadId: string;
  userId: string;
}

function LikeThread({ threadId, userId }: Props) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    // await addLikeToThread(JSON.parse(threadId), userId);
    setIsLiked(!isLiked);
  };

  return (
    <Image
      src={`/assets/${isLiked ? "heart-filled.svg" : "heart-gray.svg"}`}
      alt="like"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleLike}
    />
  );
}

export default LikeThread;
