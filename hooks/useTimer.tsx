import { useState, useEffect, useCallback } from "react";

type TimerOptions = {
  interval?: number;
  startValue?: number;
};

type TimerHook = {
  value: number;
  isActive: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

const useTimer = ({
  interval = 1000,
  startValue = 0,
}: TimerOptions = {}): TimerHook => {
  const [value, setValue] = useState(startValue);
  const [isActive, setIsActive] = useState(false);

  const tick = useCallback(() => {
    setValue((prevValue) => prevValue + 1);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      timer = setInterval(tick, interval);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isActive, interval, tick]);

  const start = () => {
    setIsActive(true);
  };

  const pause = () => {
    setIsActive(false);
  };

  const reset = () => {
    setIsActive(false);
    setValue(startValue);
  };

  return { value, isActive, start, pause, reset };
};

export default useTimer;
