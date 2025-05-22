'use client';
import React, { FC } from "react";
import { Formik, FormikHelpers, FormikValues } from "formik";

interface AppFormProps<T = FormikValues> {
    initialValues: T;
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
    validationSchema: any;
    children: React.ReactNode | ((props: { isSubmitting: boolean }) => React.ReactNode);
}

const AppForm: FC<AppFormProps> = ({ initialValues, onSubmit, validationSchema, children }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(formikProps) =>
                typeof children === "function" ? children(formikProps) : <>{children}</>
            }
        </Formik>
    );
};

export default AppForm;
