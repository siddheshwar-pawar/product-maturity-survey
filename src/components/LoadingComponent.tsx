import React, { useState, useEffect } from 'react';

const LoadingComponent: React.FC = () => {
    const [dots, setDots] = useState('.');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(dots => (dots.length === 3 ? '.' : dots + '.'));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Evaluating your answers{dots}</p>
        </div>
    );
};

export default LoadingComponent;
