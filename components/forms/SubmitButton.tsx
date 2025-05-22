'use client';
import React, { FC } from 'react';
import { useFormikContext } from 'formik';

interface AppSubmitBtnProps {
    title?: string;
    loadingText?: string;
    className?: string;
}

const SubmitButton: FC<AppSubmitBtnProps> = ({ title = 'Submit', loadingText = 'Submitting...', className }) => {
    const { handleSubmit, isSubmitting } = useFormikContext();

    return (
        <button
            type="submit"
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
            className={`bg-slate-900 hover:bg-black duration-200 cursor-pointer text-white w-auto px-6 py-3 rounded-lg mt-2 ${className}`}
        >
            {isSubmitting ? (
                <div className="flex gap-4 items-center">
                    <span className="loader"></span>
                    {loadingText}
                </div>
            ) : title}
        </button>
    );
};

export default SubmitButton;