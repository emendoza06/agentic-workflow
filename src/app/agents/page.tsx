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
  const[isCustomAgentsTab, setCustomAgentsTab] = useState(true);

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

  //Filter agents based on tab = list
  const filteredAgents = data ? isCustomAgentsTab
   ? data.agents.filter((agent: Agent) => !agent.isPreMade)
   : data.agents.filter((agent: Agent) => agent.isPreMade)
  : [];


  return (
    <div className="agent-page-style">
      {/* Agents tabs */}
      <div className="flex flex-row header-tabs-container agents-tab-container">
        {/* Custom Agents tab */}
        <button
          className="custom-agents-tab"
          style={{ zIndex: 10 }}
          onClick={() => {
          setCustomAgentsTab(true);
          }}
            >
          <div className={`header-tabs button-shadowing ${isCustomAgentsTab ? "secondary-background-color" : ""}`}><p>Custom Agents</p></div>
        </button>
        
        {/* Agent library tab */}
        <button
          style={{ zIndex: 10 }}
          onClick={() => {
          setCustomAgentsTab(false);
          }}
           >
          <div className={`header-tabs button-shadowing ${isCustomAgentsTab ? "" : "secondary-background-color"}`}><p>Agent Library</p></div>
        </button>
      </div>

      {/* first row = search + create*/}
      <div className={`row-align ${!isCustomAgentsTab ? "agent-library-search-bar" : "" }`}>
        
        {/* Search bar */}
        <div className="search-bar mb-4">
            <Input
                label="Search by role"
                color="teal"
                className="text-black"
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
        {isCustomAgentsTab && (
            <div className="flex flex-row">

            {/* Create new agent button */}
            <IconButton
              color="green"
              placeholder={undefined}
              className="float-right mr-5 secondary-background-color add-agent-button"
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
        )}
        
      </div>

      {/* Second row = Sort*/}
      <div className="sorting row-align">

        {/* Sort by Role */}
        <div className="sorting-row flex flex-row">
          <button
                    style={{ zIndex: 10 }}
                    onClick={() => {
                      // setSelectedAgent(agent);
                      // setShowAgentModal(true);
                    }}
              >
          <p>Role<Icon icon="entypo:select-arrows"  style={{color: '#3d3d3d',  width: '22px', height: '22px', position: 'relative', bottom: '20px', left: '27px' }} /></p>
          </button>
        </div>

        {/* Sort by Goal */}
        <div className="sorting-goal flex flex-row">
          <button
                    style={{ zIndex: 10 }}
                    onClick={() => {
                      // setSelectedAgent(agent);
                      // setShowAgentModal(true);
                    }}
              >
          <p>Goal<Icon icon="entypo:select-arrows"  style={{color: '#3d3d3d',  width: '22px', height: '22px', position: 'relative', bottom: '20px', left: '30px'}} /></p>
          </button>
        </div>

        {/* Sort by Backstory */}
        <div className="sorting-backstory flex flex-row">
          <button
                    style={{ zIndex: 10 }}
                    onClick={() => {
                      // setSelectedAgent(agent);
                      // setShowAgentModal(true);
                    }}
                >
          <p>Backstory<Icon icon="entypo:select-arrows"  style={{color: '#3d3d3d',  width: '22px', height: '22px', position: 'relative', bottom: '20px', left: '65px'}} /></p>
          </button>
        </div>

        {/* Sort by Tools */}
        <div className="sorting-tools flex flex-row">
          <button
                  style={{ zIndex: 10 }}
                  onClick={() => {
                    // setSelectedAgent(agent);
                    // setShowAgentModal(true);
                  }}
                >
          <p>Tools <Icon icon="entypo:select-arrows"  style={{color: '#3d3d3d',  width: '22px', height: '22px', position: 'relative', bottom: '20px', left: '35px'}} /></p>
          </button>
        </div>
      </div>

      {/* Third row = agents */}
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
        {/* {data?.agents.length === 0 && ( */}
        {filteredAgents?.length === 0 && (
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
        {filteredAgents?.map((agent: Agent, i: number) => (
          
          // This is the individual agent card
          <div key={i} className="w-full mb-4">
            <div className={`agent-card-row flex flex-row rounded overflow-hidden h-auto border`}>
              {/* Avatar image */}
              <img
                className="agent-card-img block max-w-16 h-14 w-10 flex-none"
                src={agent.image ?? "/agents_images/default-avatar.jpg"}
                alt="Agent"
              />

              {/* Agent card content */}
              <div className="agent-card-content rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-row leading-normal w-100">
                {/* Role */}
                <div className="agent-card-content-role text-gray-700 uppercase font-bold mb-2 leading-tight">
                  {agent.role}
                </div>

                {/* Goal */}
                <div className="agent-card-content-goal text-slate-300 text-ellipsis">
                  {agent.goal}
                </div>

                {/* Backstory */}
                <div className="agent-card-content-backstory mb-2 leading-tight">
                  {agent.backstory}
                </div>

                {/* Tools */}
                <div className="agent-card-content-tools text-slate-300 text-ellipsis">
                  {agent.tools}
                </div>
              </div>

              {/* Edit button */}
              <button
                className="bg-slate-400 text-black px-4 py-2 rounded-bl agent-card-edit-icon"
                style={{ zIndex: 10 }}
                onClick={() => {
                  setSelectedAgent(agent);
                  setShowAgentModal(true);
                }}
              >
                <Icon icon={`${isCustomAgentsTab? "akar-icons:edit" : "eva:expand-outline"}`} width="20" height="20" />
              </button>

            </div>
          </div>
        ))}

        {/* When creating a new agent, this is the form that pops up */}
        <AgentModal
          agent={selectedAgent!}
          showModal={showAgentModal}
          isCustomAgentsTab={isCustomAgentsTab!}
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
