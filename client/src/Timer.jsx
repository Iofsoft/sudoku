import React, { useState, useEffect } from 'react';

const Timer = ({time, setTime, isRunning, setIsRunning}) => {
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
    </div>
  );
};

export default Timer;