import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DataTable } from './_components/DataTable'

export default function AdminDashboard() {
  const { sessionClaims } = auth()

  if (sessionClaims?.metadata.role !== 'Admin') {
    redirect('/')
  }

  return (
    <main className="grid grid-cols-5 grid-row-10 flex-2 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto h-full">
      <div className="col-span-5 h-[50vh] w-full ">
        <DataTable/>
      </div>
    </main>
  )
}