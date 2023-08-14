import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props {
  currentUserId: string;
  accountId: string;
}

const ThreadsTabForCommunity = async ({
  currentUserId,
  accountId,
}: Props) => {
  const userInfo = await fetchUser(currentUserId);

  const result = await fetchCommunityPosts(accountId);
//   console.log(result);

  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          currentUser_id={userInfo._id}
          parentId={thread.parentId}
          content={thread.text}
          author={{
            name: thread.author.name,
            image: thread.author.image,
            id: thread.author.id,
          }}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
          likesCount={thread.likes.length}
        />
      ))}
    </section>
  );
};

export default ThreadsTabForCommunity;
