import React from 'react';

const Logo = () => {
    return (
    <div className={'p-1'}>
        <h1 className={'text-sm font-bold hidden md:block'}>Citizen <span
            className={'text-blue-500'}>Engagement</span> System</h1>
        <h1 className={'text-md font-bold block md:hidden'}>C<span className={'text-blue-500'}>E</span>S</h1>
    </div>
    );
};

export default Logo;