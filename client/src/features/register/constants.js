// export const MIN_DETECTION_SCORE = 0.75;
// export const MAX_CAPTURE_ATTEMPTS = 5;
// const baseModelsUrl =
//   typeof window === "undefined"
//     ? "/"
//     : new URL(import.meta.env.BASE_URL || "/", window.location.origin).href;

// export const MODEL_URL = `${baseModelsUrl}models`;
// export const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const API_BASE_URL = import.meta.env.PROD
  ? "/api/v1"
  : "http://localhost:5000/api/v1";
export const MODEL_URL = "/models";
export const MAX_CAPTURE_ATTEMPTS = 5;
export const MIN_DETECTION_SCORE = 0.5;
