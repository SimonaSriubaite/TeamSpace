import { useRef, useState, useEffect } from "react";

export const useOutsideAlerter = (initialState) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(initialState);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) setOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keydown", handleKeyPress, true);
    if (!open) {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleKeyPress, true);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleKeyPress, true);
    };
  }, [open]);

  return { open, setOpen, ref };
};
