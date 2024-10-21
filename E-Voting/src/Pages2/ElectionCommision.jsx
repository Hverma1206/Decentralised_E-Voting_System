import "./ElectionCommision.css";
import { useContext, useState } from "react";
import { walletContext } from "../components/Wallet";
import Navigation from "../components/Navigation";
import PropTypes from "prop-types";

const ElectionCommission = ({ account }) => {
  const [winner, setWinner] = useState("not declared yet");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { contract } = useContext(walletContext);

  const votingTime = async (event) => {
    event.preventDefault();
    try {
      const startTimestamp = new Date(startTime).getTime() / 1000;
      const endTimestamp = new Date(endTime).getTime() / 1000;
      await contract.methods.voteTime(startTimestamp, endTimestamp).send({ from: account, gas: 500000 });
      alert("Voting Started");
    } catch (error) {
      alert("Error starting voting: " + error.message);
    }
  };

  const emergency = async () => {
    try {
      await contract.methods.emergency().send({ from: account, gas: 500000 });
      alert("Emergency mode activated");
    } catch (error) {
      alert("Error during emergency: " + error.message);
    }
  };

  const result = async () => {
    try {
      await contract.methods.result().send({ from: account, gas: 500000 });
      const winnerCan = await contract.methods.winner().call();
      setWinner(winnerCan);
      alert("Result Declared");
    } catch (error) {
      alert("Error declaring result: " + error.message);
    }
  };

  return (
    <>
      <Navigation />
      <h2>The Winner Candidate is {winner}</h2>
      <form className="form" onSubmit={votingTime}>
        <label htmlFor="start" className="label2">
          Start Time:
          <input type="datetime-local" id="start" className="innerBoxVote" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </label>

        <label htmlFor="end" className="label2">
          End Time:
          <input type="datetime-local" id="end" className="innerBoxVote" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </label>

        <button className="regBtb btn btn-success" type="submit">Voting Start</button>
      </form>
      <div className="space">
        <button className="emerBtn btn btn-danger" type="button" onClick={emergency}>Emergency</button>
        <button className="resBtn btn btn-primary" onClick={result}>Result</button>
      </div>
    </>
  );
};

ElectionCommission.propTypes = {
  account: PropTypes.string.isRequired, // Ensure correct type for account
};

export default ElectionCommission;
