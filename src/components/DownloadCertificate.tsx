import React from 'react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

interface DownloadCertificateProps {
    certificateRef: React.RefObject<HTMLElement>;
}

const DownloadCertificate: React.FC<DownloadCertificateProps> = ({ certificateRef }) => {
    const downloadCertificate = () => {
        if (certificateRef.current) {
            toPng(certificateRef.current)
                .then((dataUrl) => {
                    saveAs(dataUrl, 'certificate.png');
                })
                .catch((err) => {
                    console.error('Failed to download certificate as image:', err);
                });
        }
    };

    return (
        <button onClick={downloadCertificate} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}>
            Download Certificate
        </button>
    );
};

export default DownloadCertificate;
