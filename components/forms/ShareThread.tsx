"use client";

import Image from "next/image";
import { toast } from "../ui/use-toast";

interface Props {
  threadId: string;
}

const ShareThread = ({ threadId }: Props) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://stitch-talk.vercel.app/thread/${JSON.parse(threadId)}`
    );
    toast({
      title: "URL Copied!",
      description: "URL copied to clipboard",
    });
  };

  return (
    <Image
      src="/assets/share.svg"
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleCopy}
    />
  );
};

export default ShareThread;
