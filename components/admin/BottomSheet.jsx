"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function BottomSheet({ open, onClose, children, height = "70vh" }) {
  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ maxHeight: height }}
            className="w-full md:w-[900px] bg-gradient-to-b from-[#0f1116] to-[#15151a] rounded-t-2xl p-4 shadow-2xl overflow-auto"
          >
            {/* handle */}
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-3" />
            {/* content */}
            <div className="text-slate-100">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
