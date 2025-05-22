'use client';

import React from 'react';
import Link from 'next/link';
import { Form } from 'formik';
import * as Yup from 'yup';

import AppForm from '@/components/forms/AppForm';
import SubmitButton from '@/components/forms/SubmitButton';
import AppInput from '@/components/forms/AppInput';
import {useAuth} from "@/contexts/AuthContext";

const validationSchema = Yup.object({
    username: Yup.string().min(4).required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const Page = () => {
    const { signup } = useAuth();

    return (
        <AppForm
            initialValues={initialValues}
            onSubmit={({ username, email, password }) => signup(username, email, password)}
            validationSchema={validationSchema}
        >
            <Form className="w-full flex flex-col justify-start items-start gap-4">
                <div>
                    <h2 className="text-2xl font-semibold">Sign up</h2>
                    <p className="font-light text-sm mt-4">Let’s get you started 🚀</p>
                </div>

                <div className="w-full mt-6">
                    <AppInput label="Username" name="username" type="text" />
                </div>

                <div className="w-full">
                    <AppInput label="Email" name="email" type="email" />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AppInput label="Password" name="password" type="password" />
                    <AppInput label="Confirm Password" name="confirmPassword" type="password" />
                </div>

                <div className="flex items-center justify-between w-full text-sm mt-4">
                    <SubmitButton title="Signup" loadingText="Signing up" />
                    <p className={'text-slate-500 flex items-center gap-1'}>
                        <span className={'hidden md:block'}>Already have an account?{' '}</span>
                        <Link href="/auth/signin" className="text-black cursor-pointer">
                            Sign in
                        </Link>
                    </p>
                </div>
            </Form>
        </AppForm>
    );
};

export default Page;