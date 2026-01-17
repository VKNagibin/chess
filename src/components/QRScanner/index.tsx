import './index.scss';

import QrSVG from './QRSVG';
import useQRScanner from './useQRScanner';

const QRUploadInputId = 'QR-file-input';

const QRScanner = () => {
  const {
    canvasRef,
    scannerAimRef,
    scannerContainerRef,
    handleOpenScanner,
    handleChooseFile,
    result,
    videoElementRef,
    stopCamera,
  } = useQRScanner();

  return (
    <>
      <button className="OpenQRScannerButton" onClick={handleOpenScanner}>
        Сканировать QR
      </button>
      <canvas className="QRScanner__Canvas" ref={canvasRef} />

      <div className="QRScanner" ref={scannerContainerRef}>
        <video className="QRScanner__Video" ref={videoElementRef} autoPlay />
        <QrSVG ref={scannerAimRef} containerClassName="QRScanner__Aim" />

        <button className="QRScanner__CloseButton" onClick={stopCamera}>
          close
        </button>
        <div className="QRScanner__UploadFileContainer">
          <input
            id={QRUploadInputId}
            onChange={handleChooseFile}
            type="file"
            className="QRScanner__UploadFileInput"
          />
          <label className="QRScanner__UploadFileLabel" htmlFor={QRUploadInputId}>
            choose file
          </label>
        </div>
      </div>
      {result}
    </>
  );
};

export default QRScanner;
