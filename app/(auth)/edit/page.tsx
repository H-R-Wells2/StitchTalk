import AccountProfile from "@/components/forms/AccountProfile"
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";


const page = async() => {

  const user = await currentUser();
  if (!user) return null;

  const userInfo= await fetchUser(user.id);

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Edit Profile</h1>
      <p className='mt-3 text-base-regular text-light-2'>Edit Profile</p>
      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  )
}

export default page