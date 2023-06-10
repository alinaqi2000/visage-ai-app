import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../../assets/brand-logo.png';
import Image from 'next/image';

export default function Brand() {
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: [0, 1.5, 1], rotate: [0, 0, 180, 180, 0] }}
      drag={true}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      transition={{
        ease: 'easeInOut',
        duration: 0.7,
      }}
    >
      <Image height={36} src={Logo} alt="Logo" />
    </motion.div>
  );
}
