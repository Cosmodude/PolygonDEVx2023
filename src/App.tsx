import { useEffect, useState } from 'react';
import { QRCodeSVG } from "qrcode.react"
import { Profile } from "./components/organisms/Profile";
import { Modal } from "./components/molecules/Modal";

const baseUrl = "https://ddff-222-112-225-79.ngrok-free.app";  // our frontend Url
//const baseUrl = "http://localhost:8080";  // our frontend Url

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [qrData, setQrData] = useState();
  const [isVerified, setVerified] = useState(false);

  async function getQrCodeData() {
    const resp = await fetch(`${baseUrl}/api/sign-in`, {
      headers: {
        'ngrok-skip-browser-warning':true
      }
    });
    const json = await resp.json();
    setQrData(JSON.stringify(json));
  }

  async function onModalClose() {
    setModalOpen(false);
    setVerified(true);
  }

  useEffect(() => {
    getQrCodeData();
  }, [])

  return (
    <>
      <Profile onVerify={() => setModalOpen(true)} isVerified={isVerified} />
      <div className="ml-16">
      {(isModalOpen && qrData) &&
        <Modal onClose={onModalClose}>
          <QRCodeSVG value={qrData} width="450" height="450" level="L" bgColor="#000" fgColor="#e9e9e9" includeMargin/>
        </Modal>
      }
      </div>
    </>
  )
}

export default App
