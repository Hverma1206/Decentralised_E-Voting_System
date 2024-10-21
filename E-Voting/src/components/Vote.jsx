import { useContext } from "react";
import { walletContext } from "../components/Wallet";
import PropTypes from "prop-types";
const Vote = ({account}) => {
    const { contract } = useContext(walletContext);
  const VoteDone = async (event) => {
    event.preventDefault();
    const vId = document.querySelector("voterId").value;
    const cId = document.querySelector("candId").value;
    try {
      await contract.methods
        .vote(vId, cId)
        .send({ from: account, gas: 480000 });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <h2>Vote here</h2>
      <form className="form">
        <label htmlFor="voterId" className="lable1">
        Voter Id: 
          <input type="text" id="voterId" className="voteInput" />
        </label>
        <label htmlFor="candId" className="lable1">
        Candidate Id:
          <input type="text" id="candId" className="voteInput" />
        </label>
        <button className="regBtn" onSubmit={VoteDone}>Vote</button>
      </form>
    </>
  );
};
Vote.propTypes = {
  account: PropTypes.node.isRequired,
};
export default Vote;
