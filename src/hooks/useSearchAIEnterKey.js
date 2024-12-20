import { useEffect } from 'react';

const useSearchAIEnterKey = (callback) => {
    /*useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                callback();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [callback]);*/
};

export default useSearchAIEnterKey;
