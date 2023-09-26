"use client";
import Link from "@node_modules/next/dist/client/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  console.log("Drop Down", toggleDropDown);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          className={"object-contain"}
          src="/assets/images/logo.svg"
          width={32}
          height={32}
          alt="Promptopia Logo"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/*Desktop Navigation*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button
              className="outline_btn"
              onClick={() => {
                setToggleDropDown(false);
                signOut();
              }}
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                    type={"button"}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
      {/*Mobile Nav*/}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              alt="Profile"
              onClick={() => {
                setToggleDropDown((prev) => !prev);
              }}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className={"dropdown_link"}
                  onClick={() => {
                    setToggleDropDown(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className={"dropdown_link"}
                  onClick={() => {
                    setToggleDropDown(false);
                  }}
                >
                  Create Prompt
                </Link>
                <button
                  type={"button"}
                  className={"mt-5 w-full black_btn"}
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {" "}
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                    type={"button"}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};
export default Nav;