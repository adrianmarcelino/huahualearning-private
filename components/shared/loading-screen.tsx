"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// 华 character drawn via SVG stroke animation, 1.2s max, then fade out.
export function LoadingScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-cream"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-5"
          >
            <svg viewBox="0 0 100 100" className="h-24 w-24">
              <motion.text
                x="50"
                y="74"
                textAnchor="middle"
                fontSize="78"
                fontWeight="900"
                fontFamily="ui-sans-serif, system-ui"
                fill="none"
                stroke="#4A6B3A"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                style={{ pathLength: 0 } as any}
              >
                华
              </motion.text>
            </svg>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs font-bold uppercase tracking-[0.5em] text-muted"
            >
              Huahua Private
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
