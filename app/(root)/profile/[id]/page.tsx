import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTabForUser from "@/components/shared/ThreadsTabForUser";
import { fetchThreadsWithReplies } from "@/lib/actions/thread.actions";

const page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  const repliesResult = await fetchThreadsWithReplies(userInfo._id);
    const totalReplies = repliesResult.reduce((total, thread) => {
    return total + thread.children.length;
  }, 0);
  // console.log(repliesResult);

  if (userInfo?.oboarded === false) {
    redirect("/onboarding");
  }
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo?.threads?.length}
                  </p>
                )}
                {tab.label === "Replies" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {totalReplies}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={"threads"} className="w-full text-light-1">
            <ThreadsTabForUser
              currentUserId={user.id}
              accountId={userInfo.id}
              tabValue="threads"
            />
          </TabsContent>
          <TabsContent value={"replies"} className="w-full text-light-1">
            <ThreadsTabForUser
              currentUserId={user.id}
              accountId={userInfo.id}
              tabValue="replies"
              repliesResult={repliesResult}
            />
          </TabsContent>
          <TabsContent value={"tagged"} className="w-full text-light-1">
            tagged
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default page;
