import React, { useState, useEffect } from "react";
import web3 from "./web3";
import lottery from "./lottery";

const App = () => {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Please wait");

    const accounts = await web3.eth.requestAccounts();

    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      setMessage("You have entered");
    } catch (e) {
      console.log(e);
      setMessage("Error. Try again");
    }
  };
  return (
    <>
      <h4>Contract is managed by: {state.manager}</h4>
      <p>There are {state.players.length}</p>
      <p>Balance: {web3.utils.fromWei(state.balance)}</p>
      <hr />
      <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button>Enter</button>
        </div>
      </form>
      <div>{message}</div>
    </>
  );
};

export default App;
