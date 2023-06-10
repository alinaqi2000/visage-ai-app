import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: 'easeInOut',
        duration: 0.5,
      }}
    >
      <div className="z-10 grid top-0 left-0 fixed place-items-center h-screen w-screen">
        <div className="h-screen w-screen fixed bg-gradient-to-r from-accent from-60% via-accent via-75% to-cyan-400 to-90% opacity-25"></div>
        <div className="grid grid-rows-1 grid-flow-col gap-4">
          <span className="loading loading-spinner text-white"></span>

          <h4 className="text-white">Plase wait...</h4>
        </div>
      </div>
    </motion.div>
  );
}
