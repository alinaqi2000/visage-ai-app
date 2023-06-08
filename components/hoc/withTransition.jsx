import { motion } from 'framer-motion';

const withTransition = OriginalComponent => {
  return props => (
    <>
      <OriginalComponent {...props} />
      <motion.div
        className="slide-in"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: .75, ease: 'easeInOut' }}
      />
      <motion.div
        className="slide-out"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: .75, ease: 'easeInOut' }}
      />
    </>
  );
};

export default withTransition;
