'use client';
import React, {useEffect, useState, JSX} from 'react';
import * as Yup from 'yup';
import {FormikHelpers, FormikValues} from 'formik';
import AppForm from '@/components/forms/AppForm';
import AppInput from '@/components/forms/AppInput';
import SubmitButton from '@/components/forms/SubmitButton';
import ComboboxField from '@/components/forms/ComboBoxField';
import {FiCopy} from "react-icons/fi";
import {PiShieldWarningThin} from "react-icons/pi";
import { useInstitutions } from '@/hooks/useInstitutions';
import useCategories from "@/hooks/useCategory";
import useSubmitTicket from "@/hooks/useSubmitTicket";

const existingComplaints = [
    {id: 1, title: 'No street lights on Main St', category: 'Electricity'},
    {id: 2, title: 'Potholes near Riverside', category: 'Roads'},
];

const USER_ID = process.env.NEXT_PUBLIC_DEFAULT_USER_ID || '68284fc1537af1f1655a4a12';

const ComplaintForm = (): JSX.Element => {
    const [type, setType] = useState<'complaint' | 'feedback' | ''>('complaint');
    const [submitted, setSubmitted] = useState(false);
    const [relatedIssues, setRelatedIssues] = useState<typeof existingComplaints>([]);

    // Fetch categories and institutions
    const { categories, loading: categoriesLoading } = useCategories();
    const { institutions, isLoading: institutionsLoading } = useInstitutions();

    // Use our new ticket hook
    const { submitTicket, loading: submittingTicket, error: submitError, ticketId } = useSubmitTicket();

    // Format categories and institutions for the ComboboxField
    const categoryOptions = categories.map(category => ({
        label: category.name,
        value: category.id
    }));

    const institutionOptions = institutions.map(institution => ({
        label: institution.name,
        value: institution.id
    }));

    const initialValues = {
        title: '',
        message: '',
        categoryId: '',
        institutionId: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(4, 'Too short').required('Title is required'),
        message: Yup.string().min(10, 'Too short').required('Message is required'),
        categoryId: Yup.string().required('Category is required'),
        institutionId: Yup.string().required('Institution is required'),
    });

    const handleSubmit = async (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
        try {
            await submitTicket(values, USER_ID);
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            helpers.setSubmitting(false);
        }
    };

    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        if (!ticketId) return;

        try {
            await navigator.clipboard.writeText(ticketId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    const filterRelated = (title: string) => {
        if (title.length > 3 && type === 'complaint') {
            const matches = existingComplaints.filter((c) =>
                c.title.toLowerCase().includes(title.toLowerCase())
            );
            setRelatedIssues(matches);
        } else {
            setRelatedIssues([]);
        }
    };

    if (submitted && ticketId) {
        return (
            <div className="bg-black text-white p-6 lg:p-12 rounded-3xl mt-24 w-full">
                <h2 className="text-xl font-bold text-blue-500">✅ Submission Successful!</h2>

                <div className={'flex items-center gap-4 mt-12'}>
                    <p className="font-medium">
                        Tracking ID: <span className="font-semibold text-blue-500">{ticketId}</span>
                    </p>
                    <button
                        onClick={handleCopy}
                        className="bg-white/10 p-4 rounded-xl cursor-pointer duration-75 hover:scale-110 active:scale-95 active:rounded-full flex items-center gap-2"
                    >
                        <FiCopy />
                        {copied && <span className="text-sm">Copied!</span>}
                    </button>
                </div>
                <div className={'border border-white p-4 lg:p-8 mt-4 rounded-xl flex items-center gap-4'}>
                    <PiShieldWarningThin size={32}/>
                    <p className="font-medium">You can use this ID to check status later.</p>
                </div>
            </div>
        );
    }

    // Show loading state while fetching categories and institutions
    if (categoriesLoading || institutionsLoading) {
        return (
            <section className="w-full mt-12">
                <h1 className="text-2xl font-bold mb-6 text-slate-600">Loading...</h1>
                <div className="w-full bg-slate-100 p-8 rounded-[32px] shadow-xl flex justify-center items-center h-64">
                    <div className="animate-pulse">Loading form data...</div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full mt-12">
            <h1 className="text-2xl font-bold mb-6 text-slate-600">
                Send <span className="text-blue-500">Feedback</span> or Submit a{' '}
                <span className="text-red-400">Complaint</span>
            </h1>
            <div
                className={`w-full border-2 bg-slate-100 border-white/80 p-4 md:p-8 rounded-[32px] md:rounded-[46px] flex flex-col justify-start items-start gap-4 shadow-xl ${type === 'complaint' ? 'shadow-red-200' : 'shadow-blue-200' }`}>
                <div className="flex mb-6 border border-slate-300 p-[1px] rounded-full">
                    {(['feedback', 'complaint'] as const).map((opt) => (
                        <button
                            key={opt}
                            className={`px-6 py-2 md:py-3 rounded-full text-sm font-semibold ${
                                type === opt
                                    ? opt === 'feedback'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-red-400 text-white'
                                    : ''
                            }`}
                            onClick={() => setType(opt)}
                        >
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </button>
                    ))}
                </div>

                {submitError && (
                    <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                        <p className="font-medium">{submitError}</p>
                    </div>
                )}

                {type && (
                    <AppForm
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {(formikProps: FormikValues & { isSubmitting: boolean }) => {
                            const {values, isSubmitting} = formikProps;
                            useEffect(() => filterRelated(values.title), [values.title]);

                            return (
                                <div className="w-full flex flex-col justify-start items-start gap-4">
                                    <AppInput name="title" label="Title"/>
                                    <AppInput
                                        name="message"
                                        label="Details"
                                        type="textarea"
                                        className="col-span-2 h-28"
                                    />
                                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 w-full'}>
                                        <ComboboxField
                                            label="Category"
                                            items={categoryOptions.map(cat => cat.label)}
                                            name="categoryId"
                                            valueKey={categoryOptions}
                                        />
                                        <ComboboxField
                                            label="Institution"
                                            items={institutionOptions.map(inst => inst.label)}
                                            name="institutionId"
                                            valueKey={institutionOptions}
                                        />
                                    </div>

                                    {type === 'complaint' && relatedIssues.length > 0 && (
                                        <div className="col-span-2 bg-yellow-100 p-4 rounded mt-4">
                                            <p className="font-semibold">⚠️ Similar complaints found:</p>
                                            <ul className="list-disc pl-5 mt-2 text-sm">
                                                {relatedIssues.map((issue) => (
                                                    <li key={issue.id}>{issue.title} ({issue.category})</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="col-span-2">
                                        <SubmitButton
                                            title={`Submit ${type}`}
                                            className={'!rounded-full !font-medium'}
                                        />
                                    </div>
                                </div>
                            );
                        }}
                    </AppForm>
                )}
            </div>
        </section>
    );
};

export default ComplaintForm;