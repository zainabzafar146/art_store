import React, { useEffect, useState } from "react";

interface AuctionTimerProps {
  firstBidTime: Date | null; // Timestamp when the first bid was placed
}

const AuctionTimer: React.FC<AuctionTimerProps> = ({ firstBidTime }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(
    firstBidTime ? 24 * 60 * 60 * 1000 - (Date.now() - firstBidTime.getTime()) : 0
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = firstBidTime 
        ? 24 * 60 * 60 * 1000 - (Date.now() - firstBidTime.getTime())
        : 0;
      setTimeRemaining(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer on unmount
  }, [firstBidTime]);

  // Format time to HH:MM:SS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  if (timeRemaining <= 0) {
    return <span className="text-red-600 font-bold">Auction Ended</span>;
  }

  return (
    <span className="font-semibold text-[#58C5C7]">
      {formatTime(timeRemaining)}
    </span>
  );
};

export default AuctionTimer;
