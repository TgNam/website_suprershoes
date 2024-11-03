import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [showCountdown, setShowCountdown] = useState(true);

  // Ngày kết thúc là 2024-11-01 06:59:59
  const endDate = new Date('2024-11-18T05:07:59');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = endDate - now;

      if (difference <= 0) {
        setShowCountdown(false);
        clearInterval(intervalId);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endDate]);

  if (!showCountdown) {
    return null; // Không hiển thị gì khi hết thời gian
  }

  return (
    <div>
      <h2>Countdown</h2>
      <div>
        <p>{`${timeLeft.days} ngày ${timeLeft.hours} giờ ${timeLeft.minutes} phút ${timeLeft.seconds} giây`}</p>
      </div>
    </div>
  );
};

export default Countdown;
