import { motion } from "framer-motion";

export const Lines = () => {
  return (
    <>
      {/* Blur Line */}
      <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-accent translate-y-[14px] w-px h-40 blur-[2px]" />
      {/* Glow Line */}
      <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-accent translate-y-[14px] w-px h-40 " />
      {/* Blur Circle */}
      <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-skyConnect translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
      {/* Glow Circle */}
      <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-dataFlow translate-y-[14px] w-[2px] h-[2px] rounded-full z-40 " />
    </>
  );
};
