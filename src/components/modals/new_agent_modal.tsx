import { selectTheme } from "@/data/consts";
import { tools } from "@/data/data";
import { Agent } from "@/types/agent";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import {
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalFooter,
  TEModalHeader,
  TERipple,
  TESelect,
} from "tw-elements-react";
import { Button, Input, Switch, Textarea } from "@material-tailwind/react";
import { useMutation } from "@apollo/client";
import { GET_BACKSTORY, CREATE_AGENT } from "@/utils/graphql_queries";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "@/styles/globals.css";

function NewAgentModal(props: {
  showModal: boolean;
  setShowModal: Function;
  onAddNewAgent: Function;
}) {
  const {
    showModal,
    setShowModal,
    onAddNewAgent: onAddNewAdent = () => {},
  } = props;

  const [tempAgent, setTempAgent] = useState<Agent>({
    role: "",
    goal: "",
    backstory: "",
    tools: [],
    allowDelegation: false,
    verbose: false,
    isPreMade: false
  });

  const resetTempAgent = () =>{
    setTempAgent({
      role: "",
      goal: "",
      backstory: "",
      tools: [],
      allowDelegation: false,
      verbose: false,
      isPreMade: false,
    });
  }

  const [createAgent] = useMutation(CREATE_AGENT);
  const [createAgentLoading, setCreateAgentLoading] = useState(false);

  const [getBackstory, {loading, error, data}] = useMutation(GET_BACKSTORY);

  const handleBackstoryRecommend = async () => {
    if (tempAgent?.role && tempAgent?.goal) {
      //Call getBackstory mutation
      const result = await getBackstory({variables: {role: tempAgent.role, goal: tempAgent.goal}});
      const {backstory, error} = result.data.getBackstory; //using result from getBackstory call
      if(!error){
        setTempAgent((prevState) => ({
          ...prevState, //Ensures the previous state of fields before are carried over so we dont' overwrite them
          backstory: backstory,
        }));
      } 
    else{
      console.error(error);
      }
    }
  }

  const handleCreateAgent = async (agentData: Agent) => {
    setCreateAgentLoading(true);
    return createAgent({
      variables: {
        ...agentData,
      },
    }).finally(() => {
      setCreateAgentLoading(false);
    });
  };


  const ReactSwal = withReactContent(Swal);

  return (
    <div>
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog size="lg">
          <TEModalContent className="create-new-modal" style={{ backgroundColor: "white" }}>
            
            {/* Header */}
            <TEModalHeader className="new-modal-header">
              <h1 className="create-new-modal-text text-xl font-medium leading-normal text-center">
                Create New Agent
              </h1>
              <Button
                className="create-new-modal-exit"
                onClick={() => {
                  resetTempAgent();
                  setShowModal(false)}}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Icon icon="ep:close-bold" width={20} height={20} />
              </Button>
            </TEModalHeader>

            {/* Body  */}
            <TEModalBody>
              <div className="sm:flex">
                <div className="sm:w-1/2 mx-auto">
                  {/* Role input */}
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

                  {/* Goal input */}
                  <div className="mb-4">
                    <label className="font-bold text-lg">Goal:</label>
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
                  </div>

                  {/* Backstory input */}
                  <div className="mb-4">
                    <div className="mb-2 flex flex-row">
                      <label className="font-bold text-lg">Backstory:</label>
                    
                      {/* if role and goal are filled, then recommend button appears */}
                      {tempAgent.role && tempAgent.goal && (
                        <button
                          className={`recommend-button button-shadowing ${loading ? "recommend-btn-disabled" : ""}`}
                          style={{ zIndex: 10 }}
                          onClick={() => {
                            handleBackstoryRecommend()
                          }}
                          disabled={loading} //Disable while laoding is true
                          >
                          <div className="justify-center flex flex-row">
                            <Icon className="backstory-icon" icon="ph:sparkle-fill" style={{color: '#46fbc5'}} width="15" height="15"/>
                            <p>{loading ? "Loading..." : "Recommend"}</p>
                          </div>
                        </button>
                      )}
                    </div>
                    
                    <Textarea
                      label="Backstory"
                      color="teal"
                      className="text-black"
                      resize={true}
                      value={loading? "Loading..." : tempAgent?.backstory || ""}
                      onChange={(event) => {
                        setTempAgent((prevState) => ({
                          ...prevState!,
                          backstory: event.target.value,
                        }));
                      }}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                    {loading && <p>Loading...</p>}
                    {error && <p>Error:...{error.message}</p>}
                  </div>

                  {/* Tools input */}
                  <div className="flex flex-wrap mb-4">
                    <div className="mb-2 flex flex-row">
                      <span className="font-bold mr-2 text-lg">Tools:</span>
                      
                      {/* if role and goal are filled, then recommend button appears */}
                      {tempAgent.role && tempAgent.goal && (
                        <button
                        className="recommend-button button-shadowing"
                        style={{ zIndex: 10 }}
                        onClick={() => {
                
                        }}
                        >
                          <div className="justify-center flex flex-row">
                            <Icon className="backstory-icon" icon="ph:sparkle-fill" style={{color: '#46fbc5'}} width="15" height="15"/>
                            <p>Recommend</p>
                          </div>
                        </button>
                      )}
                    </div>
                    
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
                  </div>

                  {/* Allow delegation input switch */}
                  <div className="flex items-center mb-4">
                    <label className="font-bold mx-2">Allow Delegation: </label>
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
                  </div>

                  {/* Verbose input switch */}
                  <div className="flex items-center mb-4">
                    <label className="font-bold mx-2">Verbose: </label>
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
                  </div>

                  {/* Memory input switch */}
                  <div className="flex items-center mb-4">
                    <label className="font-bold mx-2">Memory: </label>
                    <Switch
                      crossOrigin={undefined}
                      color="teal"
                      defaultChecked={tempAgent?.verbose}
                      onChange={(event) => {
                        setTempAgent((prevState) => ({
                          ...prevState!,
                          memory: !!event.target.value,
                        }));
                      }}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  </div>

                </div>
              </div>
            </TEModalBody>

          {/* Close and save section */}
            <TEModalFooter>
              <TERipple rippleColor="light">
                <Button
                  color="white"
                  onClick={() => setShowModal(false)}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Close
                </Button>
              </TERipple>
              <TERipple rippleColor="light">
                <Button
                  color="teal"
                  loading={createAgentLoading}
                  disabled={
                    !tempAgent.role || !tempAgent.goal || createAgentLoading
                  }
                  onClick={() => {
                    handleCreateAgent(tempAgent)
                      .then(() => {
                        setShowModal(false);
                        ReactSwal.fire({
                          title: "Smart Agent",
                          text: "New agent joined to your crew",
                          icon: "success",
                        });
                        onAddNewAdent();
                        resetTempAgent();
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
                  Add
                </Button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}

export default NewAgentModal;
