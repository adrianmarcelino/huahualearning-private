"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1100);
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
            initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: [0, -6, 6, 0], opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="grid h-20 w-20 place-items-center rounded-full bg-sage text-3xl text-cream shadow-lg shadow-sage/30">
              华
            </div>
            <div className="text-sm font-medium tracking-widest text-ink/60">HUAHUA</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
