"use client";

import AgentModal from "@/components/modals/agent_modal";
import NewAgentModal from "@/components/modals/new_agent_modal";
import { Agent } from "@/types/agent";
import { GET_AGENTS } from "@/utils/graphql_queries";
import { useQuery } from "@apollo/client";
import { Icon } from "@iconify/react";
import { Alert, Button, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";

const AgentsPage = () => {
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [showNewAgentModal, setShowNewAgentModal] = useState(false);

  const [selectedAgent, setSelectedAgent] = useState<Agent>();

  const { loading, error, data, refetch } = useQuery(GET_AGENTS);

  if (loading) {
    return (
      <Button
        variant="text"
        loading={true}
        placeholder={"Loading"}
        className="text-white"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Loading
      </Button>
    );
  }

  return (
    <div>
      <div>
        <IconButton
          color="green"
          placeholder={undefined}
          className="float-right mr-5"
          onClick={() => {
            setShowNewAgentModal(true);
          }}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Icon icon="mdi:add-bold" width="30" height="30" />
        </IconButton>
        <NewAgentModal
          showModal={showNewAgentModal}
          setShowModal={setShowNewAgentModal}
          onAddNewAgent={() => {
            refetch();
          }}
        />
      </div>
      <div className="container m-auto flex flex-wrap flex-col md:flex-col items-center justify-start p-2">
        {error && (
          <div className="w-full">
            <Alert
              color="yellow"
              icon={
                <Icon icon="material-symbols:warning-outline" fontSize={26} />
              }
              className="w-fit"
            >
              {error?.message ?? "An error occurred."}
            </Alert>
          </div>
        )}

        {/* If there's no agents yet then show alert */}
        {data?.agents.length === 0 && (
          <div className="w-full">
            <Alert
              color="cyan"
              icon={
                <Icon icon="material-symbols:warning-outline" fontSize={26} />
              }
              className="w-fit"
            >
              No Agents, Try to add one.
            </Alert>
          </div>
        )}

        {/* Loop through agent list and show div */}
        {data?.agents.map((agent: Agent, i: number) => (
          <div key={i} className="w-full p-3">
            <div className={`flex flex-row rounded overflow-hidden h-auto border`}>
              <img
                className="block max-w-16 h-14 w-10 flex-none"
                src={agent.image ?? "/agents_images/sailor.png"}
                alt="Agent"
              />
              <div className="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-row leading-normal w-100">
                <div className="text-white font-bold text-lg mb-2 leading-tight">
                  {agent.role}
                </div>
                <div className="text-slate-300 text-ellipsis">
                  Goal: {agent.goal}
                </div>
                <div className="text-white font-bold text-lg mb-2 leading-tight">
                  {agent.role}
                </div>
                <div className="text-slate-300 text-ellipsis">
                  Goal: {agent.goal}
                </div>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-bl"
                style={{ zIndex: 10 }}
                onClick={() => {
                  setSelectedAgent(agent);
                  setShowAgentModal(true);
                }}
              >
                <Icon icon="entypo:popup" width="20" height="20" />
              </button>
            </div>
          </div>
        ))}

        {/* When creating a new agent, this is the form that pops up */}
        <AgentModal
          agent={selectedAgent!}
          showModal={showAgentModal}
          setShowModal={setShowAgentModal}
          onUpdateAgent={() => {
            refetch();
          }}
          onUploadImage={() => {
            refetch();
          }}
          onDeleteAgent={() => {
            refetch();
          }}
        />
      </div>
    </div>
  );
};

export default AgentsPage;
