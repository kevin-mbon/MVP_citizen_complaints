import {Suspense} from "react";
import VerifyCodeForm from "@/app/auth/verify-email/VerifyCodeForm";

export default function VerifyEmailPage() {
    return (
        <div className="container">
            <Suspense fallback={<div>Loading...</div>}>
            <VerifyCodeForm />
            </Suspense>
        </div>
    );
}