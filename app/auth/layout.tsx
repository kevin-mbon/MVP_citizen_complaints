'use client';
import React, {FC} from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout :FC<LayoutProps> = ({children}) => {
    return (
        <main
            className={'w-screen h-screen bg-center bg-cover flex justify-center md:justify-end items-end md:items-center'}
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1489640818597-89b1edc97db5?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={'bg-linear-to-bl from-slate-400/80 to-white/80 border border-white/80 duration-1000 backdrop-blur md:mr-10 mb-4 p-4 lg:p-8 max-h-[800px] w-[94vw] md:w-[560px] xl:w-[620px] rounded-lg md:rounded-3xl duration-200 shadow-2xl'}>
                {children}
            </motion.div>
        </main>
    );
};

export default Layout;