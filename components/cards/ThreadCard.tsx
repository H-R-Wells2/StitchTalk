import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";
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
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  likesCount: number;
  isComment?: boolean;
}

const ThreadCard = async ({
  id,
  currentUserId,
  currentUser_id,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  likesCount,
  isComment,
}: Props) => {
  const thread = await fetchThreadById(id);

  return (
    <article
      className={`flex flex-col w-full rounded-xl transition-all duration-300 ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${author.id}`}
              className="relative h-11 w-11 object-cover"
            >
              <Image
                src={author.image}
                alt="profile image"
                fill
                className="cursor-pointer rounded-full object-cover"
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

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col `}>
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
                {/* To be implemented */}
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <ShareThread threadId={JSON.stringify(id)} />
              </div>
              {likesCount !== undefined && (
                <p className="mt-1 text-subtle-medium text-gray-1">
                  {likesCount} like{likesCount > 1 ? "s" : ""}
                </p>
              )}

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
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

      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={18}
            height={18}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
      {!isComment && !community && (
        <div className="mt-5 flex items-center">
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
          </p>
        </div>
      )}
      {isComment && (
        <div className="mt-7">
          {thread.children.map((childItem: any) => (
            <ThreadCard
              key={childItem._id}
              id={childItem._id}
              currentUserId={currentUserId}
              currentUser_id={currentUser_id}
              parentId={childItem.parentId}
              content={childItem.text}
              author={childItem.author}
              community={childItem.community}
              createdAt={childItem.createdAt}
              comments={childItem.children}
              likesCount={childItem.likes.length}
              isComment
            />
          ))}
        </div>
      )}
    </article>
  );
};

export default ThreadCard;
