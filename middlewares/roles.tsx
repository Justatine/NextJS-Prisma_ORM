'use server'

import { checkRole } from '@/utils/roles'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function setRole(formData: FormData) {
  // Check that the user trying to set the role is an admin
  if (!checkRole('Admin')) {
    return { message: 'Not Authorized' }
  }

  try {
    const res = await clerkClient().users.updateUser(formData.get('id') as string, {
      publicMetadata: { role: formData.get('role') },
    })
    return { message: res.publicMetadata }
  } catch (err) {
    return { message: err }
  }
}

export async function authRole() {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const role = sessionClaims?.metadata.role;
  if (role === "Admin") {
    redirect("/admin");
  } else if (role === "User") {
    redirect("/user");
  }
}