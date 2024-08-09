export const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop",
  },
};
export const floatReverseAnimation = {
  y: [0, 20, 0],
  transition: {
    duration: 3,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop",
  },
};
export default { floatAnimation, floatReverseAnimation };
