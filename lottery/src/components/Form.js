import React, { useState } from "react";
import lottery from "../lottery";
import web3 from "../web3";

const Form = ({ setMessage }) => {
  const [value, setValue] = useState("");

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
      <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button>Enter</button>
        </div>
      </form>

      <hr />
    </>
  );
};

export default Form;
