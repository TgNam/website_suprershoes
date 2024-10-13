import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import './QRCoder.scss';

const QRCode = ({ onClose, onScanComplete }) => {
    const [qrData, setQRData] = useState(''); // Hold the QR data

    const handleScan = (data) => {
        if (data) {
            setQRData(data.text);
            onScanComplete(data.text); // Call the parent function to send the scanned data
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div className="qr-code-reader">
            <QrReader
                delay={100}
                style={{ width: '100%' }}
                onError={handleError}
                onScan={handleScan}
            />
            {qrData && <p>Scanned Data: {qrData}</p>}
            <button className="btn btn-danger mb-2" onClick={onClose}>
                Đóng QR Scanner
            </button>
        </div>
    );
};

export default QRCode;
