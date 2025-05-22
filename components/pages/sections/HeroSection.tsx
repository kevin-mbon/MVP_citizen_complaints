import React from 'react';
import Container from "@/components/layout/Container";
import Link from "next/link";
import { IoMdArrowDown } from 'react-icons/io';
import ComplainForm from "@/components/features/ComplainForm";

const HeroSection = () => {
    return (
        <section id={'/'} className={'bg-slate-200 min-h-screen rounded-b-[32px] md:rounded-b-none pt-[102px]'}>
            <Container className={'flex flex-col justify-start items-start pb-8 md:pb-12 lg:pb-24'}>
                <h1 className={'text-3xl md:text-4xl font-bold text-slate-600 w-[85vw] md:w-[320px] lg:w-full py-2'}>
                    Your Voice. <span className={'text-blue-500'}>Your City.</span> One Click Away.
                </h1>
                <div className={'flex flex-col mt-1 md:mt-5 md:flex-row justify-start md:justify-center items-start md:items-center gap-4'}>
                <p className={'md:py-4 font-medium text-sm md:text-lg text-black w-[85vw] md:w-[320px] lg:w-[520px]'}>Submit feedback, track issues, and help build a better community – all from your phone or computer.</p>
                <div className={'flex'}>
                    <Link href={'/#HowItWork'} className={'px-8 lg:px-12 py-5 lg:py-6 bg-black text-white rounded-full text-sm flex items-center gap-4'}>
                        See How It Works
                        <IoMdArrowDown size={16} className={'animate-bounce'}/>
                    </Link>
                </div>
                </div>
                <ComplainForm/>
            </Container>
        </section>
    );
};

export default HeroSection;