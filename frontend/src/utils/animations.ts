import anime from 'animejs';

export const fadeInTask = (el: Element): void => {
  anime({
    targets: el,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 500,
    easing: 'easeOutCubic',
  });
};
