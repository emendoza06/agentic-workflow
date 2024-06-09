"use client";

import "../styles/globals.css";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import useNavigation from "@/hook/use_navigation";

const SideNav = () => {
  const { isMissionsActive, isAgentsActive, isWorkflowStudioActive } = useNavigation();

  return (
    <div className="sidenav-style flex-col space-y-4 items-center hidden sm:flex h-full w-[120px] md:w-[225px] md:items-start fixed">

      {/* Workflows page */}
      <Link
        href="/"
        className="nav-links-style flex flex-row duration-200 hover:bg-white/10 relative">
        {/* <Icon icon="flat-color-icons:parallel-tasks" width="35" height="35" /> */}
        <Icon icon="clarity:bolt-solid" style={{color: '#46fbc5'}} width="35" height="35"/>
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isMissionsActive ? "font-bold" : ""
          }`}
        >
          Workflows
        </span>
      </Link>

      {/* Agents page */}
      <Link
        href="/agents"
        className="link-style nav-links-style flex flex-row duration-200 hover:bg-white/10"
      >
        <Icon icon="mdi:people-group" style={{color: '#46fbc5'}} width="35" height="35" />
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isAgentsActive ? "font-bold" : ""
          }`}
        >
          Agents
        </span>
      </Link>

      
      {/* Workflow Studio Page */}
      <Link
        href="/workflow-studio"
        className="workflow-studio-link links-style nav-links-style flex flex-row duration-200 hover:bg-white/10"
      >
        <Icon icon="icon-park-twotone:bydesign" style={{color: '#46fbc5'}} width="35" height="35" />
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isWorkflowStudioActive ? "font-bold" : ""
          }`}
        >
          Workflow Studio
        </span>
      </Link>
    </div>
  );
};

export default SideNav;
