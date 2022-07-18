export const gridAnimation = {
    show: {transition: {straggerChildren: 0.1}},
    hide: {
        transition: {
            staggerChildren: 0.1,
            staggerDirection: -1
        }
    }
}

export const cardAnimation = {
    show: { y: [200, 0], opacity: [0, 1], scale: [0.95, 1] },
    hide: { y: [0, 200], opacity: [1, 0], scale: [1, 0.95] },
}

export const titleAnimation = {
    show: { y: [-100, 0], opacity: [0, 1], scale: [0.9, 1]},
    hide: { y: [0, -100], opacity: [1, 0], scale: [1, 0.9]},
}

export const solAnimation = {
    show: { width: ['200vw', '99vw'], opacity: [0, 1]},
    hide: { width: ['100vw', '200vw'], opacity: [1, 0]},
}

export const pageAnimation = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}

export const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

export const thumbnailVariants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { duration: 1.5, ...transition }
  }
};

export const transition1 = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.96]
  };
  
 export const imageVariants = {
    exit: { y: "50%", opacity: 0, transition },
    enter: {
      y: "0%",
      opacity: 1,
      transition
    }
  };

  export const backVariants = {
    exit: { x: 100, opacity: 0, transition },
    enter: { x: 0, opacity: 1, transition: { delay: 0.5, ...transition } }
  };