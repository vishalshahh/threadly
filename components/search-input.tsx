"use client"
import React from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { search } from "@/actions/search";

const SearchInput = () => {
    const searchParams = useSearchParams();

    return (
        <div className="flex justify-between ml-120 pl-120">
        <form action={search}>
            <Input defaultValue={searchParams.get("term") || ""} type="text" name="term" placeholder="Search threads..." />
        </form>
        </div>
    );
};

export default SearchInput;
