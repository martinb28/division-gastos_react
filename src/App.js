import React, { useState } from "react";
import Form from "./components/Form";
import ParticipantList from "./components/ParticipantList";
import Results from "./components/Results";

const App = () => {
  const [participants, setParticipants] = useState([]);

  const addParticipant = (name, amount) => {
    setParticipants(prevParticipants => {
      const existingParticipant = prevParticipants.find(
        participant => participant.name === name
      );
      if (existingParticipant) {
        return prevParticipants.map(participant =>
          participant.name === name
            ? { ...participant, amount: participant.amount + amount }
            : participant
        );
      } else {
        return [...prevParticipants, { name, amount }];
      }
    });
  };

  const removeParticipant = (index) => {
    setParticipants(prevParticipants => 
      prevParticipants.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-5">
        División de Gastos
      </h1>
      <Form onAddParticipant={addParticipant} />
      <ParticipantList participants={participants} onRemoveParticipant={removeParticipant} />
      <Results participants={participants} />
    </div>
  );
};

export default App;
