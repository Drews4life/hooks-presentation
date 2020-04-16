import React, { useState, useEffect } from 'react';

const useOnlineStatus = () => {
    const [isOnline, setOnlineStatus] = useState(navigator.onLine);

    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    useEffect(() => {
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    })

    return isOnline
} 

const useServiceWorkerNotifier = () => {
    const isOnline = useOnlineStatus();

    useEffect(() => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                userStatusUpdate: { isOnline, },
            });
        }
    }, [isOnline]);
}

export default () => {
    useServiceWorkerNotifier();

    return (
        <div>

        </div>
    )
}