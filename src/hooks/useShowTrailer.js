import { useEffect, useState } from "react";

const useShowTrailer = () => {
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (showTrailer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showTrailer]);

  return { showTrailer, setShowTrailer };
};

export default useShowTrailer;
