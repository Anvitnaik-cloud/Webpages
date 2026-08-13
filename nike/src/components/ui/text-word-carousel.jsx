import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useWordCarousel } from "@/components/ui/text-word-carousel-utils/use-word-carousel";

/**
 * TextWordCarousel – vertical scrolling ticker animation.
 * Words slide up into view and exit upward, clipped by overflow:hidden.
 */
export function TextWordCarousel({
  words,
  interval,
  className,
  duration = 0.35,
  ...props
}) {
  const { currentWord, key } = useWordCarousel({ words, interval });

  return (
    <span
      className={cn("inline-block relative overflow-hidden align-bottom", className)}
      style={{ height: "1.15em" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={key}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{
            duration: duration,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          {...props}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default TextWordCarousel;
