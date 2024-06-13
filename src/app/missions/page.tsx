"use client";

import "../globals.css";
import MissionModal from "@/components/modals/mission_modal";
import NewMissionModal from "@/components/modals/new_mission_modal";
import { Mission } from "@/types/mission";
import { GET_MISSIONS } from "@/utils/graphql_queries";
import { useQuery } from "@apollo/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Alert, Button, IconButton } from "@material-tailwind/react";
import { useState } from "react";

const MissionsPage = () => {
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showNewMissionModal, setShowNewMissionModal] = useState(false);

  const [selectedMission, setSelectedMission] = useState<Mission>();

  const { loading, error, data, refetch } = useQuery(GET_MISSIONS);

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

  if (error) {
    return (
      <div className="w-full">
        <Alert
          color="yellow"
          icon={<Icon icon="material-symbols:warning-outline" fontSize={26} />}
          className="w-fit"
        >
          {error?.message ?? "An error occurred."}
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col workflow-page-style">
      {/* Workflows tabs */}
      <div className="flex flex-row header-tabs-container">
        <div className="header-tabs button-shadowing secondary-background-color"><p>My Workflows</p></div>
        <div className="header-tabs button-shadowing"><p>Templates</p></div>
      </div>
      
      {/* If there's no workflows saved display an alert */}
      {data?.missions.length === 0 && (
        <div className="w-full">
          <Alert
            color="cyan"
            icon={
              <Icon icon="material-symbols:warning-outline" fontSize={26} />
            }
            className="w-fit"
          >
            No missions, Try to add one.
          </Alert>
        </div>
      )}

      {/* Container that loops through workflow cards and displays them */}
      <div className="workflow-card-container container flex flex-wrap flex-col md:flex-row justify-start p-2">
         {/* Add new workflow button */}
        <div className="workflow-card-div">
          <IconButton
            color="green"
            placeholder={undefined}
            className="float-right mr-5 add-card-button"
            onClick={() => {
              setShowNewMissionModal(true);
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Icon className="plus-icon" icon="mdi:add-bold" style={{color: '#A2A2A2'}} width="30" height="30" />
            <h3 className="workflow-card-headers text-lg font-semibold text-black">Create new</h3>
          </IconButton>
          <NewMissionModal
            showModal={showNewMissionModal}
            setShowModal={setShowNewMissionModal}
            onAddNewMission={() => {
              refetch();
            }}
          />
        </div>
        {data?.missions.map((mission: Mission, i: number) => (
          <div key={i} className="workflow-card-div">
            <div
              // className="bg-indigo-600 text-white rounded shadow-xl p-3 cursor-pointer"
              className="workflow-card hover:shadow-lg hover:shadow-green-500/40 bg-white text-black rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-100 transition duration-200"
              onClick={() => {
                setSelectedMission(mission);
                setShowMissionModal(true);
              }}
            >
              <h3 className="workflow-card-headers text-lg font-semibold">{mission.name}</h3>
              <h4 className="workflow-card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna</h4>
            </div>
          </div>
        ))}
        <MissionModal
          mission={selectedMission!}
          showModal={showMissionModal}
          setShowModal={setShowMissionModal}
          onUpdateMission={() => {
            refetch();
          }}
          onRunMission={() => {
            refetch();
          }}
          onDeleteMission={() => {
            refetch();
          }}
        />
      </div>
    </div>
  );
};

export default MissionsPage;
