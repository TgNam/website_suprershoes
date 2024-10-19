import React, { useState, useEffect } from 'react';

const Countdown = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [showCountdown, setShowCountdown] = useState(true);

  // Hàm thêm số 0 vào trước các số < 10
  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  useEffect(() => {
    // Chuyển endDate thành đối tượng Date nếu là chuỗi
    const endTime = new Date(endDate);

    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = endTime - now;

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
      <p>{`Kết thúc trong ${formatNumber(timeLeft.days || 0)} : ${formatNumber(timeLeft.hours || 0)} : ${formatNumber(timeLeft.minutes || 0)} : ${formatNumber(timeLeft.seconds || 0)}`}</p>
    </div>
  );
};

export default Countdown;
