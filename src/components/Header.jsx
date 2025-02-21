"use client";
import React, {useState} from "react";
import Link from "next/link";
import {appName, links} from "../contants/appdata";
import {usePathname} from "next/navigation";
import {signIn, signOut, useSession} from "next-auth/react";

const Header = () => {
    const {data: session} = useSession();
    const pathname = usePathname();
    const [isMenu, setIsMenu] = useState(false);
    return (
        <div className="bg-white shadow-lg h-16 flex justify-between items-center md:px-[10%]">
            <Link
                href="/"
                className="text-third-color font-bold text-2xl pl-5 md:pl-0"
            >{appName}
            </Link>
            <div
                className="md:hidden flex flex-col gap-1 pr-5"
                onClick={() => setIsMenu(!isMenu)}
            >
                <div className="w-5 h-0.5 bg-black"></div>
                <div className="w-5 h-0.5 bg-black"></div>
                <div className="w-5 h-0.5 bg-black"></div>
            </div>
            <div
                className={` ${
                    isMenu ? "flex flex-col absolute top-16 w-full" : "hidden md:flex"
                } gap-5 md:flex-row md:static bg-white md:w-auto text-center`}>
                {links?.map((link) => (
                    <div key={link.link}>
                        <Link
                            className={`${
                                pathname === link.link ? "text-third-color" : "text-gray-400"
                            }`}
                            href={link.link}
                            exact={link.exact}>
                            <span>{link.text}</span>
                        </Link>
                    </div>
                ))}
                {session && (
                    <div>
                        <Link className={`${
                            pathname === `/booking/${session.user.email}` ? "text-third-color" : "text-gray-400"
                        }`} href={`/booking/${session.user.email}`}>
                            <span>BOOKING</span>
                        </Link>
                    </div>
                )}
                {session ? (
                    <div onClick={() => signOut()}>
                        <Link className="text-red-600" href="#">
                            <span>LOGOUT</span>
                        </Link>
                    </div>

                ) : (
                    <div onClick={() => signIn("google")}>
                        <Link className="text-third-color" href="#">
                            <span>LOGIN</span>
                        </Link>
                    </div>

                )}


            </div>
        </div>
    );
};

export default Header;
