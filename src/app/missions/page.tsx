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
    <div className="workflow-page-style">

      {/* Add new workflow button */}
      <div className="add-new-card-div-style">
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
          <Icon icon="mdi:add-bold" style={{color: '#A2A2A2'}} width="30" height="30" />
        </IconButton>
        <NewMissionModal
          showModal={showNewMissionModal}
          setShowModal={setShowNewMissionModal}
          onAddNewMission={() => {
            refetch();
          }}
        />
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
      <div className="container max-w-[80%] flex flex-wrap flex-col md:flex-row items-center justify-start p-2">
        {data?.missions.map((mission: Mission, i: number) => (
          <div key={i} className="workflow-card-div p-3">
            <div
              // className="bg-indigo-600 text-white rounded shadow-xl p-3 cursor-pointer"
              className="bg-white text-black rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-100 transition duration-200"
              onClick={() => {
                setSelectedMission(mission);
                setShowMissionModal(true);
              }}
            >
              <h3 className="text-lg font-semibold text-center">{mission.name}</h3>
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
