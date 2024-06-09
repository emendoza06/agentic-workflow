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
import { Input, Switch, Textarea } from "@material-tailwind/react";

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
    <div className="agent-page-style">

      {/* first row*/}
      <div className="row-align">
        {/* Search bar */}
        <div className="search-bar mb-4">
            <Input
                label="Search by role"
                color="teal"
                className="text-white"
                //value={tempAgent?.role}
                // onChange={(event) => {
                // setTempAgent((prevState) => ({
                // ...prevState!,
                // role: event.target.value,
                // }));
                // }}
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
          </div>
        {/* Create new */}
        <div className="flex flex-row">

          {/* Create new agent button */}
          <IconButton
            color="green"
            placeholder={undefined}
            className="float-right mr-5 add-agent-button"
            onClick={() => {
              setShowNewAgentModal(true);
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Icon icon="mdi:add-bold" width="30" height="30" />
          </IconButton>
          {/* This only shows if showModal is true */}
          <NewAgentModal
            showModal={showNewAgentModal}
            setShowModal={setShowNewAgentModal}
            onAddNewAgent={() => {
              refetch();
            }}
          />

          {/* Create new agent text */}
          <h4 className="create-new-text">Create new agent</h4>
        </div>
      </div>

      {/* Second row*/}
      <div className="row-align">

        {/* Sort by Role */}
        <div className="flex flex-row">
          <p>Role</p><Icon icon="entypo:select-arrows"  style={{color: '#3d3d3d'}} />
        </div>

        {/* Sort by Goal */}
        <div className="flex flex-row">
          <p>Goal</p><Icon icon="entypo:select-arrows"  style={{color: '#3d3d3d'}} />
        </div>

        {/* Sort by Backstory */}
        <div className="flex flex-row">
          <p>Backstory</p><Icon icon="entypo:select-arrows"  style={{color: '#3d3d3d'}} />
        </div>

        {/* Sort by Tools */}
        <div className="flex flex-row">
          <p>Tools</p><Icon icon="entypo:select-arrows"  style={{color: '#3d3d3d'}} />
        </div>
      </div>

      {/* Third row */}
      {/* loop through agents section */}
      <div className="agents-container container m-auto flex flex-wrap flex-col md:flex-col items-center justify-start p-2">
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
