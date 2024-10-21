import "./ElectionCommision.css";
import { useContext, useState } from "react";
import { walletContext } from "../components/Wallet";
import Navigation from "../components/Navigation";
import PropTypes from "prop-types";
const ElectionCommision = ({ account }) => {
  const [winner, setWinner] = useState("not declared yet");
  const { contract } = useContext(walletContext);

  const votingTime = async (event) => {
    event.preventDefault();
  
    // Convert date and time values to Unix timestamps
    const startTime = new Date(document.querySelector("#start").value).getTime() / 1000;
    const endTime = new Date(document.querySelector("#end").value).getTime() / 1000;
  
    try {
      await contract.methods.voteTime(startTime, endTime).send({ from: account, gas: 500000 });
      alert("Voting Started");
    } catch (error) {
      console.error("Error starting voting:", error);
    }
  };
  
  

  const emergency = async () => {
    try {
      await contract.methods.emergency().send({ from: account, gas: 500000 });
      alert("Imposition of Emergency");
    } catch (error) {
      console.error(error);
    }
  };
  const result = async () => {
    try {
      await contract.methods.result().send({ from: account, gas: 500000 });
      const winnerCan = await contract.methods.winner().call();
      setWinner(winnerCan);
      alert("Result Declared");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Navigation />
      <h2>The Winner Candidate is {winner}</h2>
      <form className="form" onSubmit={votingTime}>
        <label htmlFor="start" className="label2">
          Start Time:
          <input type="datetime-local" id="start" className="innerBoxVote" />
        </label>

        <label htmlFor="end" className="lable2">
          End Time:
          <input type="datetime-local" id="end" className="innerBoxVote" />
        </label>

        <button className="regBtb btn btn-success" type="submit">
          Voting Start
        </button>
      </form>
      <div className="space">
        <button className="emerBtn btn btn-danger" type="button" onClick={emergency}>
          Energency
        </button>
        <button className="resBtn btn btn-primary"onClick={result}>
          Result
        </button>
      </div>
    </>
  );
};
ElectionCommision.propTypes = {
  account: PropTypes.node.isRequired,
};
export default ElectionCommision;
