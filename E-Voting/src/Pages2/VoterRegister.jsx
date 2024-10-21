import React, { useContext } from "react";
import { walletContext } from "../components/Wallet";
import Navigation from "../components/Navigation";
import PropTypes from "prop-types";
import Vote from "../components/Vote";
import VoterDisplay from "../components/VoterDisplay";
import VotingStatus from "../components/VotingStatus";
import "./VoterRegister.css";

const VoterRegister = ({ account }) => {
  const { contract } = useContext(walletContext);

  const voterRegistration = async (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const age = document.querySelector("#age").value;
    const gender = document.querySelector("#gender").value;

    try {
      await contract.methods.voterRegister(name, age, gender).send({ from: account, gas: 480000 });
      alert("Voter's registration is successful");
    } catch (error) {
      console.error("Error in registering", error);
    }
  };

  return (
    <div className="voter-register-container">
      <Navigation />

      <form className="form" onSubmit={voterRegistration}>
        <label className="label" htmlFor="name">
          Name:
        </label>
        <input type="text" className="input-box" id="name" required />

        <label className="label" htmlFor="age">
          Age:
        </label>
        <input type="text" className="input-box" id="age" required />

        <label className="label" htmlFor="gender">
          Gender:
        </label>
        <input type="text" className="input-box" id="gender" required />

        <button type="submit" className="reg-btn">
          Register
        </button>
      </form>

      <VoterDisplay />
      <Vote account={account} />
      <VotingStatus />
    </div>
  );
};

VoterRegister.propTypes = {
  account: PropTypes.node.isRequired,
};

export default VoterRegister;
