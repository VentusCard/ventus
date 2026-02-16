export function smoothScrollTo(
  element: HTMLElement,
  options?: { extraOffset?: number; duration?: number }
) {
  const navbarHeight = window.innerWidth >= 1024 ? 64
    : window.innerWidth >= 768 ? 56
    : 48;
  const extraOffset = options?.extraOffset ?? 12;
  const duration = options?.duration ?? 600;

  const targetY = element.getBoundingClientRect().top + window.scrollY - navbarHeight - extraOffset;
  const startY = window.scrollY;
  const distance = targetY - startY;
  let start: number | null = null;

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    window.scrollTo(0, startY + distance * easeOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
