'use client';
import React, { FC, useEffect, useState } from 'react';
import Container from "@/components/layout/Container";
import Link from "next/link";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import Profile from "@/components/ui/Profile";

const Header: FC = () => {
    const [hasToken, setHasToken] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setHasToken(!!token);
        setIsLoading(false);
    }, []);

    return (
        <header className="w-full fixed top-0 left-0 right-0 z-50 pt-1">
            <Container className={'px-[3px]'}>
                <div
                    className={'flex justify-between items-center py-3 bg-black text-white rounded-full px-4 md:px-12 pr-4'}>
                    <div className={'flex items-center gap-8'}>
                        <h1 className={'text-md font-bold hidden md:block'}>
                            Citizen <span className={'text-blue-500'}>Engagement</span> System
                        </h1>
                        <h1 className={'text-md font-bold block md:hidden'}>
                            C<span className={'text-blue-500'}>E</span>S
                        </h1>
                        <ul className={'hidden lg:flex items-center gap-2 font-medium text-sm'}>
                            <Link href={'/'} className={'px-6 py-3 border rounded-full'}>Home</Link>
                            <Link href={'/#about'} className={'px-2 py-3'}>About</Link>
                            <Link href={'/#FAQ'} className={'px-2 py-3'}>FAQ</Link>
                        </ul>
                    </div>

                    {!isLoading && hasToken ? (
                        <Profile />
                    ) : !isLoading && (
                        <div className="hidden lg:flex gap-[1px] border border-white p-[1px] rounded-full">
                            <Link href="/auth/signin" className="px-6 py-3 text-white rounded-l-full text-sm">
                                Sign in
                            </Link>
                            <Link href="/auth/signup" className="px-6 py-3 bg-white text-black rounded-full text-sm">
                                Sign up
                            </Link>
                        </div>
                    )}

                    <button className={'p-2 px-3 border rounded-full text-white block md:hidden'}>
                        <HiOutlineMenuAlt4 />
                    </button>
                </div>
            </Container>
        </header>
    );
};

export default Header;
