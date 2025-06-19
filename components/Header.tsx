import React from "react";
import { auth } from "@/auth";
import AuthHeader from "./Auth-Header";
import { Input } from "./ui/input";


const Header = async () => {
    const session = await auth();

    return (
        <header className="w-full bg-background border-b border-border">
            <div className="container mx-auto px-4 py-6 md:py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Branding Section */}
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 tracking-tight">
                            Thready
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground font-medium">
                            A Simple Threading App
                        </p>
                    </div>
              <div className="flex justify-between ml-100 pl-100">
                <Input
                  type="text"
                  placeholder="Search threads..."
                  className="ml-20 pl-20"
                />
              </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3">
                        <AuthHeader />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;