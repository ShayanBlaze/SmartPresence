import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import faceapi from "face-api.js";
import axios from "axios";
import {
  API_BASE_URL,
  MAX_CAPTURE_ATTEMPTS,
  MIN_DETECTION_SCORE,
  MODEL_URL,
} from "../constants";

const useFaceRegistration = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureStatus, setCaptureStatus] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stopVideo = useCallback(() => {
    if (!streamRef.current) {
      return;
    }
    streamRef.current.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraReady(false);
  }, []);

  const startVideo = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCaptureStatus("⚠️ مرورگر شما از دسترسی دوربین پشتیبانی نمی‌کند.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 960 },
          height: { ideal: 720 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraReady(true);
    } catch (err) {
      console.error("Camera error:", err);
      setCaptureStatus("❌ دسترسی به دوربین رد شد یا امکان‌پذیر نیست.");
    }
  }, []);

  const captureFaceDescriptor = useCallback(async () => {
    if (!videoRef.current) {
      return null;
    }

    for (let attempt = 1; attempt <= MAX_CAPTURE_ATTEMPTS; attempt += 1) {
      const detection = await faceapi
        .detectSingleFace(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection && detection.detection.score >= MIN_DETECTION_SCORE) {
        return Array.from(detection.descriptor);
      }

      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    return null;
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognition.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        await startVideo();
      } catch (err) {
        console.error("Model load error:", err);
        setCaptureStatus(`❌ خطا در لود مدل‌ها: ${err.message}`);
      }
    };

    loadModels();

    return () => {
      stopVideo();
    };
  }, [startVideo, stopVideo]);

  const statusTone = useMemo(() => {
    if (!captureStatus) {
      return "text-slate-400";
    }
    if (captureStatus.includes("✅")) {
      return "text-emerald-400";
    }
    if (captureStatus.includes("⚠️")) {
      return "text-amber-400";
    }
    if (captureStatus.includes("❌")) {
      return "text-rose-400";
    }
    return "text-slate-200";
  }, [captureStatus]);

  const handleRegister = useCallback(async () => {
    if (!name.trim() || !studentId.trim()) {
      setCaptureStatus("⚠️ نام و شماره دانشجویی باید وارد شوند.");
      return;
    }
    if (!cameraReady) {
      setCaptureStatus("⚠️ ابتدا باید دسترسی به دوربین برقرار شود.");
      return;
    }

    setIsSubmitting(true);
    setCaptureStatus("در حال پردازش چهره...");

    const descriptorArray = await captureFaceDescriptor();

    if (descriptorArray) {
      try {
        await axios.post(`${API_BASE_URL}/register`, {
          name: name.trim(),
          studentId: studentId.trim(),
          faceDescriptor: descriptorArray,
        });
        setCaptureStatus("✅ ثبت نام با موفقیت انجام شد!");
        setName("");
        setStudentId("");
      } catch (error) {
        console.error(error);
        const message =
          error.response?.data?.error || "❌ خطا در ارتباط با سرور";
        setCaptureStatus(message);
      }
    } else {
      setCaptureStatus(
        "⚠️ چهره‌ای با کیفیت کافی شناسایی نشد. لطفا نور و موقعیت را تنظیم کنید."
      );
    }

    setIsSubmitting(false);
  }, [captureFaceDescriptor, cameraReady, name, studentId]);

  return {
    videoRef,
    modelsLoaded,
    captureStatus,
    statusTone,
    cameraReady,
    name,
    setName,
    studentId,
    setStudentId,
    handleRegister,
    isSubmitting,
    startVideo,
  };
};

export default useFaceRegistration;

