import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn appearance={{
    elements:{
      formButtonPrimary:"hover:bg-primary-500/80"
    }
  }} />;
}