"use client"
import { useSession } from 'next-auth/react';
import React from 'react'
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signIn } from "@/actions/sign-in";
import { signOut } from "@/actions/sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

const AuthHeader = () => {
    const session = useSession();

    if (!session.data?.user) return null;
    let authContent: React.ReactNode;

    if (session.data?.user) {
        authContent = (
            <Popover>
                <PopoverTrigger asChild>
                    <Avatar className="size-10">
                        <AvatarImage src={session.data.user.image || ""} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <h1 className="font-semibold">{session.data.user.name}</h1>
                    <Separator className="my-2" />
                    <form action={signOut}>
                        <Button
                            variant="outline"
                            size="lg"
                            className="px-6 py-2.5 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 border-2"
                        >
                            <LogOut />
                            Sign Out
                        </Button>
                    </form>
                </PopoverContent>
            </Popover>
        )
    }
    else {
        authContent = (
            <>
                <form action={signIn}>
                    <Button
                        size="lg"
                        className="px-6 py-2.5 font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        Sign In
                    </Button>
                </form>
                <form action={signIn}>
                    <Button
                        variant="outline"
                        size="lg"
                        className="px-6 py-2.5 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 border-2"
                    >
                        Sign Out
                    </Button>
                </form>
            </>
        )
    }

    return authContent;
}

export default AuthHeader;