import { Metadata } from "@/types/User";
import { SignUp, useUser } from "@clerk/nextjs";

export default function UserLayout() {
  const { user } = useUser();
  const userMetadata: Metadata = user?.publicMetadata;

  return (
    <div>
      <div>Role: {userMetadata?.role}</div>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
