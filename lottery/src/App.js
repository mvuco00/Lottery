import React, { useState } from "react";
import ContractInfo from "./components/ContractInfo";
import Form from "./components/Form";
import PickWinner from "./components/PickWinner";

const App = () => {
  const [message, setMessage] = useState("");

  return (
    <>
      <ContractInfo />
      <Form setMessage={setMessage} />
      <PickWinner setMessage={setMessage} />
      <h5>{message}</h5>
    </>
  );
};

export default App;
