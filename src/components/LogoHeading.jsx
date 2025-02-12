import { useState, useEffect } from "react";

export default function AnimatedHeader() {
  const hearts = ["💙", "💚", "💛", "❤️", "🖤"];
  const [currentHeart, setCurrentHeart] = useState(hearts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeart((prev) => {
        const nextIndex = (hearts.indexOf(prev) + 1) % hearts.length;
        return hearts[nextIndex];
      });
    }, 500); // Change heart every second

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="font-semibold text-xl sm:text-2xl">I{currentHeart}It.ai</h1>
  );
}
