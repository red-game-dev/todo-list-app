import anime from 'animejs';
import { gsap } from 'gsap';

export const fadeInTask = (el: HTMLElement): void => {
  anime({
    targets: el,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 500,
    easing: 'easeOutCubic',
  });
};

export const shakeTask = (el: HTMLElement): void => {
  gsap
    .timeline()
    .to(el, {
      x: -5,
      duration: 0.1,
    })
    .to(el, {
      x: 5,
      duration: 0.1,
    })
    .to(el, {
      x: -5,
      duration: 0.1,
    })
    .to(el, {
      x: 5,
      duration: 0.1,
    })
    .to(el, {
      x: 0,
      duration: 0.1,
      ease: 'power2.out',
    });
};
