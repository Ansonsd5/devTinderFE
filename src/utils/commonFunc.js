export function formatToLocalTime(utcString, timeZone = "Asia/Kolkata") {
  const date = new Date(utcString);

  const options = {
    timeZone,
    // year:   "numeric",
    // month:  "2-digit",
    // day:    "2-digit",
    hour:   "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true
  };

  return date.toLocaleString("en-IN", options);
}

