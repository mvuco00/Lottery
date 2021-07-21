import React from "react";
import lottery from "../lottery";
import web3 from "../web3";
const PickWinner = ({ setMessage }) => {
  const handlePickingWinner = async (e) => {
    e.preventDefault();
    try {
      setMessage("Please wait");
      const accounts = await web3.eth.requestAccounts();

      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });
      setMessage("Winner has been picked");
    } catch (e) {
      setMessage("Error");
    }
  };
  return (
    <>
      <h4>Time to pick a winner?</h4>
      <button onClick={handlePickingWinner}>Pick a winner</button>
      <hr />
    </>
  );
};

export default PickWinner;
