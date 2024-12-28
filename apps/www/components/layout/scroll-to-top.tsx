import React from "react";

export function ScrollToTop() {
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return null;
}
