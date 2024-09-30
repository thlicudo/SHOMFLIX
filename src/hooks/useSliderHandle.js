import { useState, useRef, useEffect } from "react";

export const useSliderHandle = () => {
  const sliderRef = useRef();
  const [scrollAmount, setScrollAmount] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const updateScrollValues = () => {
    if (sliderRef.current) {
      const { scrollWidth } = sliderRef.current;
      setScrollWidth(scrollWidth);
    }
  };

  const handleScrollEnd = () => {
    setIsScrolling(false);
  };

  const scrollLeft = () => {
    let newScrollAmount = scrollAmount - sliderRef.current.clientWidth;

    sliderRef.current.scrollBy({
      left: -sliderRef.current.clientWidth,
      behavior: "smooth",
    });

    setIsScrolling(true);
    setScrollAmount(newScrollAmount);

    setTimeout(handleScrollEnd, 650);
  };

  const scrollRight = () => {
    let newScrollAmount = scrollAmount + sliderRef.current.clientWidth;

    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth,
      behavior: "smooth",
    });

    setIsScrolling(true);
    setScrollAmount(newScrollAmount);

    setTimeout(handleScrollEnd, 650);
  };

  useEffect(() => {
    updateScrollValues();
  }, [sliderRef.current]);

  return {
    scrollLeft,
    scrollRight,
    scrollAmount,
    scrollWidth,
    sliderRef,
    isScrolling,
  };
};
