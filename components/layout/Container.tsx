import React, {
    forwardRef,
    HTMLAttributes,
    ReactNode
} from 'react';
import clsx from 'clsx';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ children, className, ...props }, ref) => (
        <div
            ref={ref}
            className={'w-screen flex justify-center items-center'}
        >
            <div className={clsx('container mx-auto px-4', className)} {...props}>
                {children}
            </div>
        </div>
    )
);

Container.displayName = 'Container';

export default Container;