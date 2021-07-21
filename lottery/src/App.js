import React, { useState, useEffect } from "react";
import web3 from "./web3";
import lottery from "./lottery";

const App = () => {
  const [manager, setManager] = useState("");
  console.log(manager);

  useEffect(() => {
    async function fetchManager() {
      const managerContract = await lottery.methods.manager().call();
      setManager(managerContract);
    }

    fetchManager();
  }, []);

  return (
    <>
      <h1>Contract is managed by: {manager}</h1>
    </>
  );
};

export default App;
