import { SignUp } from "@clerk/nextjs";

export default function UserLayout() {
  return (
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  );
}
