import React from "react";

interface LoadingProps {
    message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
    return (
        <div className=''>
            <div className=''></div>
            <p>{message}</p>
        </div>
    );
};
