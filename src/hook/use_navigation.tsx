"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

const useNavigation = () => {
  const pathname = usePathname();
  const [isMissionsActive, setisMissionsActive] = useState(true);
  const [isAgentsActive, setIsAgentsActive] = useState(false);

  useEffect(() => {
    setisMissionsActive(false);
    setIsAgentsActive(false);

    switch (pathname) {
      case "/":
        setisMissionsActive(true);
        break;
      case "/agents":
        setIsAgentsActive(true);
        break;
      default:
        // Handle any other cases here
        break;
    }
  }, [pathname]);

  return {
    isMissionsActive,
    isAgentsActive,
  };
};

export default useNavigation;
