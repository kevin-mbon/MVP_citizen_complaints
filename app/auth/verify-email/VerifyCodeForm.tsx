// components/VerifyCodeForm.tsx

'use client'; // Ensure it's treated as a Client Component

import React, { useEffect, useRef, useState } from 'react';
import { Form, FormikValues } from 'formik';
import AppForm from '@/components/forms/AppForm';
import SubmitButton from '@/components/forms/SubmitButton';
import * as Yup from 'yup';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'next/navigation';

const validationSchema = Yup.object({
    code: Yup.string()
        .length(6, 'Code must be 6 digits')
        .required('Verification code is required'),
});

const VerifyCodeForm = () => {
    const inputsRef = useRef<HTMLInputElement[]>([]);
    const searchParams = useSearchParams();
    const emailParam = searchParams.get('email');
    const [storedEmail, setStoredEmail] = useState('');
    const { verifyCode } = useAuth();

    useEffect(() => {
        const localEmail = localStorage.getItem('resetEmail');
        setStoredEmail(emailParam || localEmail || '');
    }, [emailParam]);

    const initialValues = {
        code: '',
    };

    const handleCodeSubmit = (values: FormikValues) => {
        verifyCode(storedEmail, values.code);
    };

    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        setFieldValue: (field: string, value: any) => void,
        values: typeof initialValues
    ) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 1);
        const updated = values.code.split('');
        updated[index] = val;
        setFieldValue('code', updated.join(''));
        if (val && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent,
        index: number,
        values: typeof initialValues,
        setFieldValue: (field: string, value: any) => void
    ) => {
        if (e.key === 'Backspace') {
            const updated = values.code.split('');
            updated[index] = '';
            setFieldValue('code', updated.join(''));
            if (index > 0 && !values.code[index]) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    if (!storedEmail) {
        return (
            <div>
                <p>If you have registered your email, you will receive a verification code.</p>
                <div className="flex items-center gap-3 mt-4">
                    <span>Go back to</span>
                    <Link
                        className="bg-black text-white px-6 py-4 rounded-lg"
                        href="/auth/forgot-password"
                    >
                        Forgot Password
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <AppForm
            initialValues={initialValues}
            onSubmit={handleCodeSubmit}
            validationSchema={validationSchema}
        >
            {({ values, setFieldValue }: FormikValues) => (
                <Form className="w-full flex flex-col gap-6">
                    <div>
                        <h2 className="text-2xl font-semibold">Verify Code</h2>
                        <p className="font-light text-sm mt-2">Enter the 6-digit code sent to your email.</p>
                    </div>

                    <div className="gap-2 grid grid-cols-6 w-full">
                        {[...Array(6)].map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    if (el) inputsRef.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={values.code[index] || ''}
                                onChange={(e) => handleInput(e, index, setFieldValue, values)}
                                onKeyDown={(e) => handleKeyDown(e, index, values, setFieldValue)}
                                className="h-14 border-1 border-slate-900 text-center text-lg rounded-md focus:outline-none focus:border-black"
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-between w-full text-sm">
                        <SubmitButton title={'Verify Code'} loadingText={'Verifying'} />
                        <Link href="/auth/signin" className="text-black cursor-pointer">
                            Back to Sign in
                        </Link>
                    </div>
                </Form>
            )}
        </AppForm>
    );
};

export default VerifyCodeForm;
