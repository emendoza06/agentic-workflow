"use client";

import "../globals.css";
import { useQuery } from "@apollo/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Alert, Button, IconButton } from "@material-tailwind/react";
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
      {agentCards.map((agentCard, index) => (
        <div key={agentCard.id} className="agent-card-container">
           <AgentCard id={agentCard.id} content={agentCard.content} onRemove={removeAgentCard} />
          {index !== null && <div className="line"></div>}
        </div>
      ))}
      <AddCardButton onClick={addAgentCard} />
    </div>
  );
};

export default WorkflowStudioPage;

