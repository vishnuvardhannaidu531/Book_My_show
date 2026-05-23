import { motion } from "framer-motion";

const MotionDiv = motion.div;

export default function GlassmorphCard({ children, className = "", hoverable = true, ...props }) {
  return (
    <MotionDiv
      whileHover={hoverable ? { y: -8, boxShadow: "0 24px 70px rgba(0, 0, 0, 0.45), 0 0 38px rgba(245, 158, 11, 0.12)" } : {}}
      className={`glass rounded-2xl p-6 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </MotionDiv>
  );
}
