export const BASE_URL = location.hostname.includes(["localhost"])
  ? "http://localhost:7777"
  : "/api";
