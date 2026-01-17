import jsQR from 'jsqr';
import { loadEnvFile } from 'process';
import { useEffect, useRef, useState } from 'react';

const useQRScanner = () => {
  const videoElementRef = useRef(null);
  const scannerContainerRef = useRef(null);
  const animationIdRef = useRef(null);
  const scannerAimRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [result, setResult] = useState('');

  const scanQR = () => {
    if (!videoElementRef.current || !canvasRef.current) return;

    const video = videoElementRef.current;

    const { width, height } = scannerAimRef.current.getBoundingClientRect();

    const centerX = width / 2;
    const centerY = height / 2;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = width;
    canvas.height = height;

    const processFrame = () => {
      if (video.readyState !== video.HAVE_ENOUGH_DATA) {
        console.log('video.readyState', video.readyState);
        animationIdRef.current = requestAnimationFrame(processFrame);
        return;
      }

      ctx.drawImage(
        video,
        centerX,
        centerY,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height,
      );
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code) {
        setResult(code.data);
        stopCamera();
        cancelAnimationFrame(animationIdRef.current);
        return;
      }

      setTimeout(() => {
        animationIdRef.current = requestAnimationFrame(processFrame);
      }, 300);
    };
    animationIdRef.current = requestAnimationFrame(processFrame);
  };

  const handleOpenScanner = async () => {
    try {
      if (streamRef.current) {
        stopCamera();
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
        },
        audio: false,
      });

      streamRef.current = stream;

      videoElementRef.current.srcObject = stream;
      scannerContainerRef.current.style.display = 'block';

      scanQR();
    } catch (err) {
      alert('Ошибка доступа к камере: ', err);
    }
  };

  const stopCamera = () => {
    cancelAnimationFrame(animationIdRef.current);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;

      if (videoElementRef.current) videoElementRef.current.srcObject = null;
      if (scannerContainerRef.current) scannerContainerRef.current.style.display = 'none';
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleChooseFile = () => {
    return null;
  };

  return {
    canvasRef,
    scannerAimRef,
    scannerContainerRef,
    handleOpenScanner,
    handleChooseFile,
    result,
    videoElementRef,
    stopCamera,
  };
};

export default useQRScanner;
