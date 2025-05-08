import { useState, useRef } from "react";

interface Props {
  storageKey: string;
  durationSeconds: number;
}

export function useCountdown({ storageKey, durationSeconds }: Props) {
  const getRemainingTime = () => {
    if (typeof window === "undefined") return 0;
    const expiryTime = localStorage.getItem(storageKey);
    if (!expiryTime) return 0;
    const remaining = Math.floor((Number(expiryTime) - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  };

  const [countdown, setCountdown] = useState(() => getRemainingTime());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const remaining = getRemainingTime();
      setCountdown(remaining);
      if (remaining <= 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
        localStorage.removeItem(storageKey);
      }
    }, 1000);
  };

  if (typeof window !== "undefined" && !initializedRef.current) {
    if (countdown > 0) {
      startInterval();
    }
    initializedRef.current = true;
  }

  const startCountdown = () => {
    const expiryTimestamp = Date.now() + durationSeconds * 1000;
    localStorage.setItem(storageKey, expiryTimestamp.toString());
    setCountdown(durationSeconds);
    startInterval();
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return { countdown, startCountdown, formatTime };
}
