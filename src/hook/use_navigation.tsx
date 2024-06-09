"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

const useNavigation = () => {
  const pathname = usePathname();
  const [isMissionsActive, setisMissionsActive] = useState(true);
  const [isAgentsActive, setIsAgentsActive] = useState(false);
  const [isWorkflowStudioActive, setIsWorkflowStudioActive] = useState(false);

  useEffect(() => {
    setisMissionsActive(false);
    setIsAgentsActive(false);
    setIsWorkflowStudioActive(false);

    switch (pathname) {
      case "/":
        setisMissionsActive(true);
        break;
      case "/agents":
        setIsAgentsActive(true);
        break;
      case "/workflow-studio":
        setIsWorkflowStudioActive(true);
        break;
      default:
        // Handle any other cases here
        break;
    }
  }, [pathname]);

  return {
    isMissionsActive,
    isAgentsActive,
    isWorkflowStudioActive
  };
};

export default useNavigation;
