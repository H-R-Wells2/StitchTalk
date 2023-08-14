import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import ReppliesTabCard from "../cards/RepliesTabCard";

interface Props {
  currentUserId: string;
  accountId: string;
  tabValue?: string;
  repliesResult? : any;
}

const ThreadsTabForUser = async ({
  currentUserId,
  accountId,
  tabValue,
  repliesResult
}: Props) => {
  // own info
  const userInfo = await fetchUser(currentUserId);



  const result = await fetchUserPosts(accountId);
  // const repliesResult = await fetchThreadsWithReplies(userInfo2._id);

  // const totalReplies = repliesResult.reduce((total, thread) => {
  //   return total + thread.children.length;
  // }, 0);


  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {tabValue === "threads" &&
        result.threads.map((thread: any) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            currentUser_id={userInfo._id}
            parentId={thread.parentId}
            content={thread.text}
            author={{ name: result.name, image: result.image, id: result.id }}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            likesCount={thread.likes.length}
          />
        ))}

      {tabValue === "threads" && result.threads.length === 0 && (
        <span className="self-center">No Threads Yet</span>
      )}

      {tabValue === "replies" &&
        repliesResult.map((thread: any) => (
          <ReppliesTabCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            currentUser_id={userInfo._id}
            parentId={thread.parentId}
            content={thread.text}
            author={{ name: result.name, image: result.image, id: result.id }}
          />
        ))}
      {tabValue === "replies" && repliesResult.length === 0 && (
        <span className="self-center">No Replies Yet</span>
      )}
    </section>
  );
};

export default ThreadsTabForUser;
