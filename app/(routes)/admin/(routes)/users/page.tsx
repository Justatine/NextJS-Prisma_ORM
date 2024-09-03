import { SearchUsers } from "./_search-users";
import { clerkClient } from "@clerk/nextjs/server";
import { setRole } from "./_actions";
import { Heading } from "@/components/ui/heading";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  const query = params.searchParams.search;

  const users = query
    ? (await clerkClient.users.getUserList({ query })).data
    : [];

  return (
    <div className="p-4">
      <Heading title="Store Users" description="Manage store users" />
      <SearchUsers />

      <div className="flex flex-col items-center justify-center space-y-4">
        {users.map((user) => {
          return (
            <Card key={user.id} className="w-[550px]">
              <CardHeader>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>
                    {user.firstName} {user.lastName}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    • {user.publicMetadata.role as string}
                  </p>
                </div>
                <CardDescription>
                  {
                    user.emailAddresses.find(
                      (email) => email.id === user.primaryEmailAddressId
                    )?.emailAddress
                  }
                </CardDescription>
              </CardHeader>

              <div>
                <Badge variant="default" className="ml-6">
                  Make user
                </Badge>
                <div className="flex space-x-2 m-4">
                  <form action={setRole} className="flex space-x-2">
                    <input type="hidden" value={user.id} name="id" />
                    <input type="hidden" value="Admin" name="role" />
                    <Button type="submit" size="sm" variant="outline">
                      Admin
                    </Button>
                  </form>
                  <form action={setRole} className="flex space-x-2">
                    <input type="hidden" value={user.id} name="id" />
                    <input type="hidden" value="User" name="role" />
                    <Button type="submit" size="sm" variant="outline">
                      User
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}