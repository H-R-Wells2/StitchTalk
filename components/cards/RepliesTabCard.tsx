import Image from "next/image";
import Link from "next/link";
import DeleteThread from "../forms/DeleteThread";
import LikeThread from "../forms/LikeThread";
import ShareThread from "../forms/ShareThread";
import { fetchThreadById } from "@/lib/actions/thread.actions";

interface Props {
  id: string;
  currentUserId: string;
  currentUser_id: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  isComment?: boolean;
}

const ReppliesTabCard = async ({
  id,
  currentUserId,
  currentUser_id,
  parentId,
  content,
  author,
  isComment,
}: Props) => {
  const thread = await fetchThreadById(id);

  return (
    <div>
      <article
        className={`flex flex-col w-full transition-all duration-300 ${
          isComment
            ? "px-0 xs:px-7 bg-dark-3 rounded-b-xl"
            : "bg-dark-2 p-7 rounded-t-xl"
        }`}
      >
        <div className="flex items-start justify-between mt-3">
          <div className="flex w-full flex-1 flex-row gap-4">
            <div className="flex flex-col items-center">
              <Link
                href={`/profile/${author.id}`}
                className="relative h-11 w-11"
              >
                <Image
                  src={author.image}
                  alt="profile image"
                  fill
                  className="cursor-pointer rounded-full"
                />
              </Link>
              <div className="thread-card_bar" />
            </div>

            <div className="flex w-full flex-col">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1 ">
                  {author.name}
                </h4>
              </Link>
              <p className="mt-2 text-small-regular text-light-2">{content}</p>

              <div
                className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}
              >
                <div className="flex gap-3.5">
                  {/* Like */}
                  <LikeThread
                    threadId={JSON.stringify(id)}
                    userId={JSON.stringify(currentUser_id)}
                  />

                  <Link href={`/thread/${id}`}>
                    <Image
                      src="/assets/reply.svg"
                      alt="reply"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  </Link>
                  {/* <Image
                    src="/assets/repost.svg"
                    alt="repost"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  /> */}
                  <ShareThread threadId={JSON.stringify(id)} />
                </div>
              </div>
            </div>
          </div>
          <DeleteThread
            threadId={JSON.stringify(id)}
            currentUserId={currentUserId}
            authorId={author.id}
            parentId={parentId}
            isComment={isComment}
          />
        </div>
      </article>
      <div className="bg-dark-3 pl-8 rounded-b-xl py-2">
        {thread.children.map((childItem: any) => (
          <ReppliesTabCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={currentUserId}
            currentUser_id={currentUser_id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            isComment
          />
        ))}
      </div>
    </div>
  );
};

export default ReppliesTabCard;
