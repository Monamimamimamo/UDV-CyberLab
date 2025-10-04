import { FaCheck } from 'react-icons/fa';
import { FiMaximize, FiUpload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const IconSwitcher = ({
  isSelected,
  isDragOver,
}: {
  isSelected: boolean;
  isDragOver: boolean;
}) => {
  return (
    <AnimatePresence mode="wait">
      {isSelected ? (
        <motion.div
          key="check"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <FaCheck className="text-[24px]" />
        </motion.div>
      ) : isDragOver ? (
        <motion.div
          key="maximize"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <FiMaximize className="text-[24px]" />
        </motion.div>
      ) : (
        <motion.div
          key="upload"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <FiUpload className="text-[24px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
