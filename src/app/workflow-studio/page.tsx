"use client";

import "../globals.css";
import { useQuery } from "@apollo/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Alert, Button, IconButton, Switch } from "@material-tailwind/react";
import { useState } from "react";

import AgentCard from '@/components/workflow-studio-comp/agent_card';
import AddCardButton from '@/components/workflow-studio-comp/add_card_button';

const WorkflowStudioPage: React.FC = () => {
  const [agentCards, setAgentCards] = useState<{ id: number; content: string }[]>([]);

  const addAgentCard = () => {
    setAgentCards([...agentCards, { id: agentCards.length, content: ' Agent Card Added' }]);
  };

  const removeAgentCard = (id: number) => {
    // setCards changes cards state
    setAgentCards(agentCards.filter(agentCard => agentCard.id !== id));
  };

  return (
    <div className="workflow-studio-page">
        {/* Workflow section */}
        <div className="workflow-section">
            {agentCards.map((agentCard, index) => (
                <div key={agentCard.id} className="agent-card-container">
                <AgentCard id={agentCard.id} content={agentCard.content} onRemove={removeAgentCard} />
                {index !== null && <div className="line"></div>}
                </div>
            ))}
            <AddCardButton onClick={addAgentCard} />
        </div>

        {/* Output section */}
        <div className="output-div">
            <div className="output-div-header">
                <h3 className="output-header-text">Output</h3>
            </div>
            <div className="output-div-radio-button">
                <p>Radio button here!!!!!</p>
            </div>
            <div className="output-div-log-container">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    </div>
  );
};

export default WorkflowStudioPage;

