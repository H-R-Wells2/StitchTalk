import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props{
    currentUserId: string;
    accountId: string;
    accountType: string;
}

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
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
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

const ThreadsTab = async ({currentUserId, accountId, accountType}:Props) => {
  const userInfo= await fetchUser(currentUserId);

  let result:Result;

  if(accountType === 'Community'){
    result = await fetchCommunityPosts(accountId)
  }else{
    result = await fetchUserPosts(accountId)
    
  }


  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
        {result.threads.map((thread:any)=>(
            <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            currentUser_id={userInfo._id}
            parentId={thread.parentId}
            content={thread.text}
            author={accountType==='User' ? {name:result.name, image:result.image, id:result.id}:{name:thread.author.name, image:thread.author.image, id:thread.author.id}}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
          />
        ))}
    </section>
  )
}

export default ThreadsTab