import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import ReppliesTabCard from "../cards/RepliesTabCard";
import { fetchThreadsWithReplies } from "@/lib/actions/thread.actions";

interface Props {
  currentUserId: string;
  accountId: string;
  tabValue?: string;
}

const ThreadsTabForUser = async ({
  currentUserId,
  accountId,
  tabValue,
}: Props) => {
  // own info
  const userInfo = await fetchUser(currentUserId);

  // info of user we are visiting
  const userInfo2 = await fetchUser(accountId);

  const result = await fetchUserPosts(accountId);
  const repliesResult = await fetchThreadsWithReplies(userInfo2._id);

  // console.log(userInfo2)
  // console.log(repliesResult);

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
          />
        ))}

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
    </section>
  );
};

export default ThreadsTabForUser;
