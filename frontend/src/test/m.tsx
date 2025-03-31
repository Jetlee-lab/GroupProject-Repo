"use client";

import { AnimatePresence, motion, wrap } from "framer-motion";
import { forwardRef, SVGProps, useState } from "react";

export const AP = UsePresenceData;

export default function UsePresenceData() {
  const items = [1, 2, 3, 4, 5, 6];
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [direction, setDirection] = useState<1 | -1>(1);

  function setSlide(newDirection: 1 | -1) {
    const nextItem = wrap(1, items.length, selectedItem + newDirection);

    setSelectedItem(nextItem);
    setDirection(newDirection);
  }

  const color = `var(--hue-${selectedItem})`;

  return (
    <div style={container}>
      <ExitAnimation />
      <motion.div
        style={{ backgroundColor: "red", width: 40, height: 40 }}
        initial={{ opacity: 0 }}
        animate={
          (selectedItem > 1 && {
            opacity: 1,
            // x: 100,
            transition: {
            //   delay: 0.2,
            //   type: "spring",
              visualDuration: 0.1,
              bounce: 0,
            },
          }) ||
          undefined
        }
      >
        Icon
      </motion.div>
      <motion.div
        initial={{ x: -40 }}
        animate={
          (selectedItem > 1 && {
            // opacity: 1,
            x: 0,
            transition: {
              delay: 0,
              type: "tween",
              visualDuration: 0.5,
              ease: ['easeInOut']
              // bounce: 0.4,
            },
          }) ||
          undefined
        }
      >
        Login
      </motion.div>
      <motion.button
        initial={false}
        animate={{ backgroundColor: color }}
        aria-label="Previous"
        style={button}
        onClick={() => setSlide(-1)}
        whileFocus={{ outline: `2px solid ${color}` }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft />
      </motion.button>
      <AnimatePresence custom={direction} initial={false} mode="popLayout">
        <Slide key={selectedItem} color={color} direction={direction} />
      </AnimatePresence>
      <motion.button
        initial={false}
        animate={{ backgroundColor: color }}
        aria-label="Next"
        style={button}
        onClick={() => setSlide(1)}
        whileFocus={{ outline: `2px solid ${color}` }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowRight />
      </motion.button>
    </div>
  );
}

const Slide = forwardRef(function Slide(
  { color, direction }: { color: string; direction: number },
  ref: React.Ref<HTMLDivElement>,
) {
  // const direction = -1; // usePresenceData();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.2,
          type: "spring",
          visualDuration: 0.6,
          bounce: 0.4,
        },
      }}
      exit={{ opacity: 0, x: direction * -20 }}
      style={{ ...box, backgroundColorx: color }}
    >
      <input value={`pdcdc ${color}`} readOnly />
      <button
        style={{ backgroundColor: "#aaf" }}
      >{`click ${direction}`}</button>
    </motion.div>
  );
});

/**
 * ==============   Icons   ================
 */
const iconsProps: SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function ArrowLeft() {
  return (
    <svg {...iconsProps}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg {...iconsProps}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  display: "flex",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
};

const box: React.CSSProperties = {
  width: 150,
  height: 150,
  // backgroundColor: "#0cdcf7",
  borderRadius: "10px",
  border: "2px solid #eee",
};

const button: React.CSSProperties = {
  backgroundColor: "#0cdcf7",
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  zIndex: 1,
  outlineOffset: 2,
};

export function ExitAnimation() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div style={container1}>
      <AnimatePresence initial={false}>
        {isVisible ? (
          <motion.div
            initial={{ left: 0, scale: 0 }}
            animate={{ left: 80, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={box1}
            key="box"
          />
        ) : null}
      </AnimatePresence>
      <motion.button
        style={button1}
        onClick={() => setIsVisible(!isVisible)}
        whileTap={{ y: 1 }}
      >
        {isVisible ? "Hide" : "Show"}
      </motion.button>
    </div>
  );
}

/**
 * ==============   Styles   ================
 */

const container1: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  width: 100,
  height: 160,
  position: "relative",
};

const box1: React.CSSProperties = {
  width: 100,
  height: 100,
  backgroundColor: "#eedcf7",
  borderRadius: "10px",
};

const button1: React.CSSProperties = {
  backgroundColor: "#0cdcf7",
  borderRadius: "10px",
  padding: "10px 20px",
  color: "#0f1115",
  // position: "absolute",
  // bottom: 0,
  // left: 0,
  // right: 0,
};
