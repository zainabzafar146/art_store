import React, { useEffect, useState } from "react";

interface AuctionTimerProps {
  firstBidTime: Date | null; // Timestamp when the first bid was placed
}

const AuctionTimer: React.FC<AuctionTimerProps> = ({ firstBidTime }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [initialized, setInitialized] = useState(false); // Track initialization

  useEffect(() => {
    if (!firstBidTime || initialized) return;

    const calculateTimeRemaining = () => {
      const startTime = new Date(firstBidTime).getTime();
      const now = Date.now();
      const remaining = 24 * 60 * 60 * 1000 - (now - startTime);
      return remaining > 0 ? remaining : 0;
    };

    // Set initial timeRemaining and mark as initialized
    setTimeRemaining(calculateTimeRemaining());
    setInitialized(true);

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        const newRemaining = calculateTimeRemaining();
        return newRemaining > 0 ? newRemaining : 0;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up interval on unmount
  }, [firstBidTime, initialized]);

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
