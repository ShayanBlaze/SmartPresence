import React from "react";

const StatusBadge = ({ ready }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
      ready
        ? "bg-emerald-500/10 text-emerald-400"
        : "bg-amber-500/10 text-amber-400"
    }`}
  >
    <span
      className={`h-2 w-2 rounded-full ${
        ready ? "bg-emerald-400" : "bg-amber-400"
      }`}
    />
    {ready ? "آماده به کار" : "در حال بارگذاری..."}
  </span>
);

export default React.memo(StatusBadge);

