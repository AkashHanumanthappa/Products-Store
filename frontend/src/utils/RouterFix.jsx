

// src/utils/RouterFix.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Helper component to fix routing issues on Netlify
 * This component helps normalize URLs and handles edge cases
 */
const RouterFix = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Clean up URLs with trailing slashes (except for root)
    if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
      navigate(location.pathname.slice(0, -1), { replace: true });
    }
    
    // Fix any other URL issues here if needed
  }, [location.pathname, navigate]);

  return null; // This component doesn't render anything
};

export default RouterFix;