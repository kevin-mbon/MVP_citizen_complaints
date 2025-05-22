'use client'
import React from 'react';
import Link from "next/link";
import { Form } from 'formik';
import * as Yup from 'yup';
import AppForm from "@/components/forms/AppForm";
import SubmitButton from "@/components/forms/SubmitButton";
import AppInput from "@/components/forms/AppInput";
import {useAuth} from "@/contexts/AuthContext";

// Define validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Page = () => {
    const initialValues = { email: '', password: '' };
    const {signin } = useAuth()

    return (
        <AppForm
            initialValues={initialValues}
            onSubmit={
                ({ email, password }) => {
                    signin(email, password)

                }
            }
            validationSchema={validationSchema}>
                <Form className={'w-full flex flex-col justify-start items-start gap-4'}>
                    <div>
                        <h2 className={'text-2xl font-semibold'}>Sign in</h2>
                        <p className={'font-light text-sm mt-4'}>Hello, Welcome back 👋</p>
                    </div>
                    <div className={'w-full mt-6'}>
                        <AppInput label="Email" name="email" type="email" />
                    </div>
                    <div className={'w-full'}>
                        <div className={'flex items-center justify-between text-sm'}>
                            <label className={'font-normal'}>Password</label>
                            <Link href={'/auth/forgot-password'} className={'text-blue-600 cursor-pointer'}>Forgot
                                Password</Link>
                        </div>
                        <AppInput label="" name="password" type="password" />
                    </div>
                    <div className={'flex items-center justify-between w-full text-sm'}>
                        <SubmitButton title={'Signin'} loadingText={'Signing in'}/>
                        <p className={'text-slate-500 flex items-center gap-1'}>
                            <span className={'hidden md:block'}>If you don't have an account, please{' '}</span>
                            <Link href={'/auth/signup'} className={'text-black cursor-pointer'}>Create Account</Link>
                        </p>
                    </div>
                </Form>
        </AppForm>
    );
};

export default Page;