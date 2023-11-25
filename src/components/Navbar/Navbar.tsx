import Link from "next/link";
import MainWrapper from "../Wrapper/MainWrapper";
import { buttonVariants } from "../ui/button";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MainWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link
            href="/dashboard"
            className="flex items-center pl-3 mb-14 pt-12"
          >
            <div className="relative w-8 h-8 mr-4">
              <Image fill alt="logo" src="/logo.png" />
            </div>
            <h1 className={cn("text-2xl font-bold", montserrat.className)}>
              Puffy
            </h1>
          </Link>

          {/*TODO: mobile navbar */}
          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  href="pricing"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>
                <LoginLink
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>
                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? "Your account"
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ""}
                  imageUrl={user.picture ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </MainWrapper>
    </nav>
  );
};

export default Navbar;
