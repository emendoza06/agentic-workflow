import React from 'react';

// Need to know what properties to expect beforehand
interface AgentCardProps {
    id: number;
    content: string;
    onRemove: (id: number) => void;
  }
  

// Each agent card has id and content associated w/ it. So onRemove we fetch ID which ties to the card we clicked
const AgentCard: React.FC<AgentCardProps> = ({  id, content, onRemove }) => {
  return (
    <div className="agent-card">
      <div className='agent-workflow-card-content'>
        {/* Card text */}
        <div className='agent-workflow-card-text'>
            {content}
        </div>

        {/* Remove card button */}
        {/* onClick, performs the onRemove function that was passed. onRemove knows the current set of cards */}
        <button className="remove-agent-card-button" onClick={() => onRemove(id)}>
            <div className="remove-agent-card-icon">-</div>
        </button>
        
        </div>
    </div>
  );
};

export default AgentCard;
