import { useContext, useState } from "react";
import { walletContext } from "../components/Wallet";
import Navigation from "../components/Navigation";
import PropTypes from "prop-types";
import Vote from "../components/Vote";
import VoterDisplay from "../components/VoterDisplay";
import VotingStatus from "../components/VotingStatus";
import "./VoterRegister.css";

const VoterRegister = ({ account }) => {
  const { contract } = useContext(walletContext);
  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const voterRegistration = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.voterRegister(name, age, gender).send({ from: account, gas: 480000 });
      alert("Voter's registration is successful");
    } catch (error) {
      alert("Error in registering: " + error.message);
    }
  };

  return (
    <div className="voter-register-container">
      <Navigation />
      <form className="form" onSubmit={voterRegistration}>
        <label className="label" htmlFor="name">Name:</label>
        <input type="text" className="input-box" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label className="label" htmlFor="age">Age:</label>
        <input type="text" className="input-box" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />

        <label className="label" htmlFor="gender">Gender:</label>
        <input type="text" className="input-box" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required />

        <button type="submit" className="reg-btn">Register</button>
      </form>

      <VoterDisplay />
      <Vote account={account} />
      <VotingStatus />
    </div>
  );
};

VoterRegister.propTypes = {
  account: PropTypes.string.isRequired, // Ensure correct type for account
};

export default VoterRegister;
