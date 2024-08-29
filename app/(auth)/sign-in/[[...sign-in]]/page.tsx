import React from 'react'
import { SignedOut, SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignedOut>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </SignedOut>
  )
}
