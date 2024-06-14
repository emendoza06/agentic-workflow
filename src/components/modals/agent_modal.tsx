"use client";

import { tools } from "@/data/data";
import { Agent } from "@/types/agent";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
  TESelect,
} from "tw-elements-react";
import TWFileInput from "../inputs/file";
import { selectTheme } from "@/data/consts";
import { Button, Input, Switch, Textarea } from "@material-tailwind/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DELETE_AGENT, UPDATE_AGENT } from "@/utils/graphql_queries";
import { useMutation } from "@apollo/client";
import Image from "next/image";

export default function AgentModal(props: {
  agent: Agent;
  showModal: boolean;
  isCustomAgentsTab: boolean;
  setShowModal: Function;
  onUpdateAgent?: Function;
  onUploadImage?: Function;
  onDeleteAgent?: Function;
}): JSX.Element {
  const {
    agent,
    showModal,
    isCustomAgentsTab,
    setShowModal,
    onUpdateAgent = () => {},
    onUploadImage = () => {},
    onDeleteAgent = () => {},
  } = props;

  const [isEdit, setEdit] = useState(false);

  const [tempAgent, setTempAgent] = useState<Agent>(agent);

  useEffect(() => {
    setTempAgent(agent);
  }, [agent]);

  const [imageFile, setImageFile] = useState<Blob>();

  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      setImageFile(file);
      reader.readAsDataURL(file);
    }
  };

  const [uploadLoading, setUploadLoading] = useState(false);
  const handleUploadImage = async () => {
    setUploadLoading(true);
    if (imageFile) {
      const body = new FormData();
      body.append("agent_id", agent.id as string);
      body.append("image", imageFile);
      const response = await fetch("/api/upload_agent_image", {
        method: "POST",
        body,
      });
      if (response.ok) {
        response
          .json()
          .then((data) => {
            if (data.success) {
              setTempAgent({ ...tempAgent, image: data.url });
              ReactSwal.fire({
                title: "Finished",
                text: "Agent image updated successfully",
                icon: "success",
              });
              onUploadImage();
            } else {
              ReactSwal.fire({
                title: "Error",
                text: data.error,
                icon: "error",
              });
            }
          })
          .catch((error) => {
            ReactSwal.fire({
              title: "Error",
              text: error,
              icon: "error",
            });
          })
          .finally(() => {
            setUploadLoading(false);
          });
      } else {
        ReactSwal.fire({
          title: "Error",
          text: "An error occurred, try again.",
          icon: "error",
        });
        setUploadLoading(false);
      }
    }
  };

  const [updateAgent] = useMutation(UPDATE_AGENT);
  const [updateAgentLoading, setUpdateAgentLoading] = useState(false);

  const handleUpdateAgent = async (agentData: Agent) => {
    setUpdateAgentLoading(true);
    return updateAgent({
      variables: {
        ...agentData,
        id: Number.parseInt(agentData.id as string),
      },
    }).finally(() => {
      setUpdateAgentLoading(false);
    });
  };

  const [deleteAgent] = useMutation(DELETE_AGENT);
  const [deleteAgentLoading, setDeleteAgentLoading] = useState(false);

  const handleDeleteAgent = async () => {
    setDeleteAgentLoading(true);
    return deleteAgent({
      variables: {
        id: Number.parseInt(agent.id as string),
      },
    }).finally(() => {
      setDeleteAgentLoading(false);
    });
  };

  const ReactSwal = withReactContent(Swal);

  return (
    <div>
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog size="lg">
          <TEModalContent className="create-new-modal" style={{ backgroundColor: "white" }}>
            <TEModalHeader className="new-modal-header">
              <h1 className="create-new-modal-text text-xl font-medium leading-normal">
                {agent?.role}
              </h1>
              <Button
                className="create-new-modal-exit"
                onClick={() => setShowModal(false)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Icon icon="ep:close-bold" width={20} height={20} />
              </Button>
            </TEModalHeader>
            <TEModalBody>
              {/* <div className="sm:flex"> */}
              <div>
                
                <div className="edit-agent-modal-content sm:w-1/2">
                  
                  {/* If editing role */}
                  {isEdit && (

                    // Role
                    <div className="mb-4">
                      <label className="font-bold text-lg">Role:</label>
                      <Input
                        label="Role"
                        color="teal"
                        className="text-black"
                        value={tempAgent?.role}
                        onChange={(event) => {
                          setTempAgent((prevState) => ({
                            ...prevState!,
                            role: event.target.value,
                          }));
                        }}
                        crossOrigin={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    </div>
                  )}

                  {/* If not editing image */}
                  {!isEdit && (
                    <img
                    src={tempAgent?.image ?? "/agents_images/default-avatar.jpg"}
                    alt="Agent Image"
                    className="edit-agent-current-image w-12 mx-auto rounded-lg"
                  /> 
                  )}
                  
                  {/* Goal */}
                  <div className="mb-4">
                    <label className="font-bold text-lg">Goal:</label>
                    {isEdit ? (
                      <Input
                        label="Goal"
                        color="teal"
                        className="text-black"
                        value={tempAgent?.goal}
                        onChange={(event) => {
                          setTempAgent((prevState) => ({
                            ...prevState!,
                            goal: event.target.value,
                          }));
                        }}
                        crossOrigin={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    ) : (
                      <div>{agent?.goal}</div>
                    )}
                  </div>

                  {/* Backstory */}
                  <div className="mb-4">
                    <label className="font-bold text-lg">Backstory:</label>
                    {isEdit ? (
                      <Textarea
                        label="Backstory"
                        color="teal"
                        className="text-black"
                        resize={true}
                        value={tempAgent?.backstory || ""}
                        onChange={(event) => {
                          setTempAgent((prevState) => ({
                            ...prevState!,
                            backstory: event.target.value,
                          }));
                        }}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    ) : (
                      <div>{agent?.backstory}</div>
                    )}
                  </div>

                  {/* Tools */}
                  <div className="flex flex-wrap mb-4">
                    <span className="font-bold mr-2 text-lg">Tools:</span>
                    {isEdit ? (
                      <TESelect
                        data={tools}
                        multiple
                        value={tempAgent?.tools}
                        onValueChange={(event: any) => {
                          const newValue = event.map((item: any) => item.value);
                          setTempAgent((prevState) => ({
                            ...prevState!,
                            tools: newValue,
                          }));
                        }}
                        className="w-full"
                        theme={selectTheme}
                      />
                    ) : (
                      agent?.tools.map((tool) => (
                        <span
                          key={tool}
                          className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                        >
                          {tool}
                        </span>
                      ))
                    )}
                  </div>

                  {/* Allow Delagation */}
                  <div className="flex items-center mb-4">
                    <label className="font-bold mx-2">Allow Delegation: </label>
                    {isEdit ? (
                      <Switch
                        crossOrigin={undefined}
                        color="teal"
                        defaultChecked={tempAgent?.allowDelegation}
                        onChange={(event) => {
                          setTempAgent((prevState) => ({
                            ...prevState!,
                            allowDelegation: !!event.target.value,
                          }));
                        }}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    ) : (
                      <Switch
                        crossOrigin={undefined}
                        color="teal"
                        checked={agent?.allowDelegation}
                        disabled={true}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    )}
                  </div>

                  {/* Verbose */}
                  <div className="flex items-center mb-4">
                    <label className="font-bold mx-2">Verbose: </label>
                    {isEdit ? (
                      <Switch
                        crossOrigin={undefined}
                        color="teal"
                        defaultChecked={tempAgent?.verbose}
                        onChange={(event) => {
                          setTempAgent((prevState) => ({
                            ...prevState!,
                            verbose: !!event.target.value,
                          }));
                        }}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    ) : (
                      <Switch
                        crossOrigin={undefined}
                        color="teal"
                        checked={agent?.verbose}
                        disabled={true}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    )}
                  </div>

                  {/* Memory */}
                  <div className="flex items-center mb-4">
                    <label className="font-bold mx-2">Memory: </label>
                    {isEdit ? (
                      <Switch
                        crossOrigin={undefined}
                        color="teal"
                        defaultChecked={tempAgent?.memory}
                        onChange={(event) => {
                          setTempAgent((prevState) => ({
                            ...prevState!,
                            memory: !!event.target.value,
                          }));
                        }}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    ) : (
                      <Switch
                        crossOrigin={undefined}
                        color="teal"
                        checked={agent?.memory}
                        disabled={true}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    )}
                  </div>

                  {/* Image Upload field */}
                  <div className="edit-agent-upload-image-div">
                    {isEdit && (
                      <>
                      <label className="font-bold mx-2">Agent Image: </label>
                        <div className="flex flex-row edit-agent-modal-image-field">
                          <TWFileInput
                            accept="image/*"
                            onChange={handleImageChange}
                          />

                          {/* Upload button */}
                          <div className="edit-agent-upload-button text-center py-1">
                            <Button
                              onClick={() => {
                                handleUploadImage();
                              }}
                              loading={uploadLoading}
                              disabled={uploadLoading || !selectedImage}
                              color="teal"
                              className="mx-auto"
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              Upload
                            </Button>
                          </div>

                          {/* See image that's uploaded
                          <div className="edit-agent-modal-uploaded-img">
                          {selectedImage && (
                            <img
                              // @ts-ignore
                              src={selectedImage}
                              alt="Agent Image"
                              className="mx-auto my-3 max-w-72 h-auto"
                            />
                          )}
                          </div> */}

                        </div>
                      {/* See image that's uploaded */}
                      <div className="edit-agent-modal-uploaded-img">
                      {selectedImage && (
                        <img
                          // @ts-ignore
                          src={selectedImage}
                          alt="Agent Image"
                          className="mx-auto my-3 max-w-72 h-auto"
                          />
                      )}
                      </div>
                      </>
                    )}
                    </div>
                </div>

                {/* Upload/edit agent image */}
                {/* <div className="m-4 sm:w-1/2">
                  {isEdit ? (
                    <>
                      <label className="font-bold mx-2">Agent Image: </label>
                      <TWFileInput
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <div className="text-center py-1">
                        <Button
                          onClick={() => {
                            handleUploadImage();
                          }}
                          loading={uploadLoading}
                          disabled={uploadLoading || !selectedImage}
                          color="teal"
                          className="mx-auto"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Upload
                        </Button>
                      </div>
                      {selectedImage && (
                        <img
                          // @ts-ignore
                          src={selectedImage}
                          alt="Agent Image"
                          className="mx-auto my-3 max-w-72 h-auto"
                        />
                      )}
                    </>
                  ) : (
                    <img
                      src={tempAgent?.image ?? "/agents_images/sailor.png"}
                      alt="Agent Image"
                      className="w-7/12 mx-auto rounded-lg"
                    />
                  )}
                </div> */}
              </div>
            </TEModalBody>

            {/* Save or delete buttons */}
            {isCustomAgentsTab && (
              <TEModalFooter>
              {!isEdit && (
                <>
                  {/* Delete Button */}
                  <TERipple rippleColor="light">
                    <Button
                      color="red"
                      className="mx-1 text-black delete-button"
                      loading={deleteAgentLoading}
                      onClick={() => {
                        ReactSwal.fire({
                          title: "Pay Attention",
                          text: "Are you sure you want to delete this agent?",
                          icon: "error",
                        })
                          .then(() => {
                            handleDeleteAgent().then(() => {
                              setShowModal(false);
                              onDeleteAgent();
                              ReactSwal.fire({
                                title: "Deleted",
                                text: "Agent deleted successfully",
                                icon: "success",
                              });
                            });
                          })
                          .catch((error) => {
                            ReactSwal.fire({
                              title: "Error",
                              text: error,
                              icon: "warning",
                            });
                          });
                      }}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Delete
                    </Button>
                  </TERipple>

                  {/* Edit Button */}
                  <TERipple rippleColor="light">
                    <Button
                      className="text-white"
                      color="teal"
                      onClick={() => setEdit(true)}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Edit
                    </Button>
                  </TERipple>
                </>
              )}

              {/* While editing on footer */}
              {isEdit && (
                <>
                  {/* Cancel button */}
                  <TERipple rippleColor="light">
                    <Button
                      color="white"
                      onClick={() => setEdit(false)}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Cancel
                    </Button>
                  </TERipple>

                  {/* Save changes button */}
                  <TERipple rippleColor="light">
                    <Button
                      color="teal"
                      loading={updateAgentLoading}
                      disabled={
                        !tempAgent.role || !tempAgent.goal || updateAgentLoading
                      }
                      onClick={() => {
                        handleUpdateAgent(tempAgent)
                          .then(() => {
                            setShowModal(false);
                            setEdit(false);
                            ReactSwal.fire({
                              title: "Updated",
                              text: "Agent updated successfully",
                              icon: "success",
                            });
                            onUpdateAgent();
                          })
                          .catch((error) => {
                            ReactSwal.fire({
                              title: "Error",
                              text: error,
                              icon: "error",
                            });
                          });
                      }}
                      className="mx-1"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Save Changes
                    </Button>
                  </TERipple>
                </>
              )}
              </TEModalFooter>
            )}
            
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}
