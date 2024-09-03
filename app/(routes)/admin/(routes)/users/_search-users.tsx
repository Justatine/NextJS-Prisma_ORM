"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center mb-6">
      <Card className="w-[550px] pt-6">
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const queryTerm = formData.get("search") as string;
              router.push(pathname + "?search=" + queryTerm);
            }}
          >
            <div className="flex">
              <Input
                id="search"
                name="search"
                type="text"
                placeholder="user@email.com"
              />
              <Button type="submit" variant="ghost">
                Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};