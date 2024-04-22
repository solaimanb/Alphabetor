import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

const HeaderAction = () => {
  const { userId } = auth();

  return (
    <div className="hidden md:flex items-center justify-between">
      {userId ? (
        <div className="flex items-center gap-x-2">
          <Link href={"/dashboard"} className="ml-auto">
            <Button
              variant="brandOutline"
              type="button"
              size={"sm"}
              className="font-bold"
            >
              Dashboard
            </Button>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <div className="flex items-center gap-x-2">
          <Link href={"/sign-in"}>
            <Button variant="brandOutline" size="sm" padding="lg">
              Sign In
            </Button>
          </Link>

          <Link href={"/sign-up"}>
            <Button size="sm" padding="lg">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderAction;
