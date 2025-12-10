import React from "react";
import useFaceRegistration from "./hooks/useFaceRegistration";
import StatusBadge from "./components/StatusBadge";

const steps = [
  "صورت خود را در مرکز تصویر نگه دارید.",
  "نور محیط را تنظیم کنید تا سایه کم شود.",
  "فرم را با اطلاعات واقعی پر کنید.",
  "برای تکرار، کلید ثبت را دوباره فشار دهید.",
];

const Register = () => {
  const {
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
  } = useFaceRegistration();

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="space-y-6 rounded-3xl border border-slate-900/60 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
              اسمارت پرزنس
            </p>
            <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl">
              ثبت‌نام حضور و غیاب هوشمند
            </h1>
            <p className="text-sm text-slate-400">
              اطلاعات هویتی را وارد کنید و سپس روبه‌روی دوربین بایستید تا
              هوش مصنوعی چهره را ذخیره کند.
            </p>
          </header>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
              <span className="text-slate-300">وضعیت مدل‌های هوش مصنوعی</span>
              <StatusBadge ready={modelsLoaded} />
              <button
                type="button"
                onClick={startVideo}
                className="text-xs font-semibold text-cyan-300 underline-offset-4 transition hover:text-cyan-200 hover:underline"
              >
                تلاش دوباره برای اتصال دوربین
              </button>
            </div>
          </div>

          <div className="space-y-5 rounded-2xl border border-slate-800/70 bg-slate-950/60 p-6 shadow-inner shadow-black/40">
            <div className="space-y-2">
              <label
                className="text-sm font-semibold text-slate-200"
                htmlFor="student-name"
              >
                نام و نام خانوادگی
              </label>
              <input
                id="student-name"
                type="text"
                placeholder="مثلاً علی رضایی"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-semibold text-slate-200"
                htmlFor="student-id"
              >
                شماره دانشجویی
              </label>
              <input
                id="student-id"
                type="text"
                placeholder="شماره یکتا"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleRegister}
                disabled={!modelsLoaded || isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-400 hover:to-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {isSubmitting ? "در حال پردازش..." : "ثبت چهره و اطلاعات"}
              </button>
              <p className="text-center text-xs text-slate-400 sm:text-right">
                داده‌ها فقط برای کلاس ذخیره می‌شود و قابل حذف است.
              </p>
            </div>

            {captureStatus && (
              <p className={`text-center text-sm font-semibold ${statusTone}`}>
                {captureStatus}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-5">
            <p className="mb-3 text-sm font-semibold text-slate-200">
              راهنمای سریع ثبت چهره
            </p>
            <ul className="grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
              {steps.map((step) => (
                <li
                  key={step}
                  className="rounded-xl border border-slate-800/70 bg-slate-900/30 px-3 py-2"
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="space-y-5 rounded-3xl border border-slate-900/60 bg-slate-900/40 p-4 shadow-2xl shadow-black/40">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              width="640"
              height="480"
              className="aspect-video w-full rounded-2xl border border-slate-900/40 object-cover"
            />
          </div>
          <p className="text-center text-sm text-slate-400">
            {cameraReady
              ? "در فاصله ۵۰ تا ۷۰ سانتی‌متری بایستید و به دوربین نگاه کنید."
              : "برای شروع، دسترسی به دوربین را تایید کنید یا روی تلاش دوباره بزنید."}
          </p>
          <div className="grid gap-3 rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4 text-sm text-slate-300">
            <div>
              <p className="font-semibold text-slate-100">تشخیص بهتر روی موبایل</p>
              <p className="text-slate-400">
                حتماً صفحه را فول‌اسکرین کنید و در مرورگرهای مبتنی‌بر کروم یا
                سافاری با HTTPS اجرا کنید تا دسترسی دوربین آزاد شود.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-100">حریم خصوصی</p>
              <p className="text-slate-400">
                فقط بردار ویژگی چهره ذخیره می‌شود و تصویر خام نگهداری نخواهد شد.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Register;

