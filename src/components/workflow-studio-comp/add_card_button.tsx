import React from 'react';

interface AddCardButtonProps {
  onClick: () => void; // Define the type of the onClick prop
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ onClick }) => {
  return (
    <button className="add-agent-card-button" onClick={onClick}>
      <div className="add-agent-card-icon button-shadowing">+</div>
    </button>
  );
};

export default AddCardButton;
