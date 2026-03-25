import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import ParticipantList from "./components/ParticipantList";
import Results from "./components/Results";

const STORAGE_KEY = "division-gastos-participants";

const App = () => {
  const [participants, setParticipants] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
  }, [participants]);

  const addParticipant = (name, amount) => {
    setParticipants((prev) => {
      const existing = prev.find((p) => p.name === name);
      if (existing) {
        return prev.map((p) =>
          p.name === name ? { ...p, amount: p.amount + amount } : p
        );
      }
      return [...prev, { name, amount }];
    });
  };

  const removeParticipant = (index) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto mt-10 p-5 max-w-lg">
      <h1 className="text-3xl font-heading font-bold text-center text-primary mb-6">
        División de Gastos
      </h1>
      <Form onAddParticipant={addParticipant} />
      <ParticipantList
        participants={participants}
        onRemoveParticipant={removeParticipant}
      />
      <Results participants={participants} />
    </div>
  );
};

export default App;
