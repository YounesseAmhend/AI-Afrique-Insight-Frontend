import React from "react";

interface ErrorMessageProps {
    message: string;
    retry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message,
    retry,
}) => {
    return (
        <div className=''>
            <p className=''>{message}</p>
            {retry && (
                <button onClick={retry} className=''>
                    Retry
                </button>
            )}
        </div>
    );
};
