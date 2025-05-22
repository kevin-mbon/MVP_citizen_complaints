'use client'
import React from 'react';
import Link from "next/link";
import { Form } from 'formik';
import * as Yup from 'yup';
import AppForm from "@/components/forms/AppForm";
import SubmitButton from "@/components/forms/SubmitButton";
import AppInput from "@/components/forms/AppInput";
import { useAuth } from '@/contexts/AuthContext';

// Define validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
});

const Page = () => {
    const initialValues = {
        email: '',
    };

    const { forgotPassword } = useAuth();

    return (
        <AppForm
            initialValues={initialValues}
            onSubmit={({ email }) => {
                localStorage.setItem('resetEmail', email);
                forgotPassword(email);
            }
        }
            validationSchema={validationSchema}>
            <Form className={'w-full flex flex-col justify-start items-start gap-4'}>
                <div>
                    <h2 className={'text-2xl font-semibold'}>Forgot Password</h2>
                    <p className={'font-light text-sm mt-4'}>Enter your email to receive a password reset code.</p>
                </div>
                <div className={'w-full mt-6'}>
                    <AppInput label="Email" name="email" type="email" />
                </div>
                <div className={'flex items-center justify-between w-full text-sm'}>
                    <SubmitButton title={'Send Reset Code'} loadingText={'Sending'}/>
                    <Link href={'/auth/signin'} className={'text-black cursor-pointer'}>Back to Sign in</Link>
                </div>
            </Form>
        </AppForm>
    );
};

export default Page;