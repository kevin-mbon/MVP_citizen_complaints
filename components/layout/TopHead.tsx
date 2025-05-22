import React from 'react';
import Breadcrumb from "@/components/ui/Breadcrumb";
import Profile from "@/components/ui/Profile";

const TopHead = () => {
    return (
        <div className={'w-full flex justify-between items-center wrapper'}>
            <Breadcrumb />
            <Profile/>
        </div>
    );
};

export default TopHead;