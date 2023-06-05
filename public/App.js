var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Profile } from './components/organisms/Profile';
import { Modal } from './components/molecules/Modal';
const baseUrl = 'https://ddff-222-112-225-79.ngrok-free.app'; // our frontend Url
//const baseUrl = "http://localhost:8080";  // our frontend Url
function App() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [qrData, setQrData] = useState('');
    const [isVerified, setVerified] = useState(false);
    function getQrCodeData() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield fetch(`${baseUrl}/api/sign-in`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            });
            const json = yield resp.json();
            const data = JSON.stringify(json);
            setQrData(data);
        });
    }
    function onModalClose() {
        return __awaiter(this, void 0, void 0, function* () {
            setModalOpen(false);
            setVerified(true);
        });
    }
    useEffect(() => {
        getQrCodeData();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Profile, { onVerify: () => setModalOpen(true), isVerified: isVerified }), _jsx("div", Object.assign({ className: "ml-16" }, { children: isModalOpen && qrData && (_jsx(Modal, Object.assign({ onClose: onModalClose }, { children: _jsx(QRCodeSVG, { value: qrData, width: "450", height: "450", level: "L", bgColor: "#000", fgColor: "#e9e9e9", includeMargin: true }) }))) }))] }));
}
export default App;
