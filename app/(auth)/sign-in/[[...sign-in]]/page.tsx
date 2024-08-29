import React from 'react'
import { SignedOut, SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <SignedOut>
            <SignIn routing="hash" />
        </SignedOut>
    </div>
  )
}
