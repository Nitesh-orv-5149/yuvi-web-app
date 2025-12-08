"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function BottomSheet({ open, onClose, children, height = "70vh" }) {
  const backdropStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(6px)",
    zIndex: 70,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  };

  const sheetStyle = {
    width: "100%",
    maxWidth: 980,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: "14px 14px 30px",
    boxShadow: "0 -10px 40px rgba(0,0,0,0.6)",
    overflow: "auto",
    background: "linear-gradient(180deg, rgba(12,14,18,0.98), rgba(22,24,30,0.98))",
    color: "#e6eef8",
  };

  const handleStyle = {
    width: 48,
    height: 4,
    background: "rgba(255,255,255,0.08)",
    margin: "6px auto",
    borderRadius: 4,
  };

  return (
    <AnimatePresence>
      {open && (
        <div style={backdropStyle} onClick={onClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ ...sheetStyle, maxHeight: height }}
          >
            <div style={handleStyle} />
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
