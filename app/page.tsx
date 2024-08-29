import { authRole } from "@/middlewares/roles";
import { UserButton, SignedIn } from "@clerk/nextjs";

export default async function Home() {
  await authRole();

  return (
    <div>
      <SignedIn>
        <div>Root Page Waiting room</div>
        <UserButton showName />
      </SignedIn>
    </div>
  );
}
