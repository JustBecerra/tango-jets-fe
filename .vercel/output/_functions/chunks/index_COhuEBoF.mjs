import { jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

const RouteGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const authToken = document.cookie.includes("authToken");
    if (!authToken) {
      window.location.href = "/";
    } else {
      setIsAuthenticated(true);
    }
  }, []);
  return isAuthenticated ? /* @__PURE__ */ jsx(Fragment, { children }) : null;
};

export { RouteGuard as R };
