import { useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Makes a dialog usable without a mouse.
 *
 * The modals here had role="dialog" and aria-modal but nothing behind them:
 * Escape did not close them, Tab walked straight out into the page underneath,
 * and closing dropped focus back to <body> instead of the control that opened
 * it. Screen-reader and keyboard users were effectively stuck.
 *
 * Returns a ref to attach to the dialog container.
 */
export const useModalA11y = (isOpen, onClose) => {
  const containerRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    /* Remember who opened this so focus can go home on close. */
    previouslyFocusedRef.current = document.activeElement;

    const container = containerRef.current;
    const focusables = () =>
      container ? [...container.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null) : [];

    /* Move focus in, preferring the first real control over the close button. */
    const initial = focusables();
    if (initial.length > 0) {
      const firstInput = initial.find((el) => /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
      (firstInput || initial[0]).focus();
    } else if (container) {
      container.focus();
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      /* Wrap around instead of escaping into the page behind the overlay. */
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    /* Stop the page behind the overlay from scrolling under the dialog. */
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = previousOverflow;
      const returnTo = previouslyFocusedRef.current;
      if (returnTo && typeof returnTo.focus === "function" && document.contains(returnTo)) {
        returnTo.focus();
      }
    };
  }, [isOpen, onClose]);

  return containerRef;
};
