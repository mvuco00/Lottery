import React, { useState, useEffect } from "react";
import lottery from "../lottery";
import web3 from "../web3";

const ContractInfo = () => {
  const [state, setState] = useState({
    manager: "",
    players: [],
    balance: "",
  });

  useEffect(() => {
    async function fetchManager() {
      const managerContract = await lottery.methods.manager().call();
      const playersContract = await lottery.methods.getPlayers().call();
      const balanceContract = await web3.eth.getBalance(
        lottery.options.address
      );
      setState({
        manager: managerContract,
        players: playersContract,
        balance: balanceContract,
      });
    }

    fetchManager();
  }, []);
  return (
    <>
      <h4>Contract is managed by: {state.manager}</h4>
      <p>There are {state.players.length}</p>
      <p>Balance: {web3.utils.fromWei(state.balance)}</p>
      <hr />
    </>
  );
};

export default ContractInfo;
