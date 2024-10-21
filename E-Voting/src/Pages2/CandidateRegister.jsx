import "./CandidateRegister";
import { useContext } from "react";
import { walletContext } from "../components/Wallet";
import Navigation from "../components/Navigation";
import PropTypes from "prop-types";
import CandidateDisplay from "../components/CandidateDisplay";

const CandidateRegister = ({ account }) => {
  const { contract } = useContext(walletContext);
  const candidateRegisteration = async (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const party = document.querySelector("#party").value;
    const age = document.querySelector("#age").value;
    const gender = document.querySelector("#gender").value;
    const partyData = {
      gender,
      party,
    };
    const res = await fetch("http://localhost:3000/api/candidate-verify", {
      method: "POST",
      headers: {
        "content-type": "applicaation/json",
      },
      body: JSON.stringify(partyData),
    });
    const data= await res.json();
    console.log(data);
  //   try {
  //     await contract.methods
  //       .candidateRegister(name, party, age, gender)
  //       .send({ from: account, gas: 480000 });
  //     alert("Candidate's registration successful");
  //   } catch (error) {
  //     console.error("Error registering candidate:", error);
  //   }
  };
  console.log(account);
  return (
    <>
      <Navigation />
      <form className="form" onSubmit={candidateRegisteration}>
        <label className="lable1" htmlFor="name">
          Name:
        </label>
        <input type="text" className="innerBoxCand" id="name" />
        <label className="lable1" htmlFor="party">
          Party:
        </label>
        <input type="text" className="innerBoxCand" id="party" />
        <label className="lable1" htmlFor="age">
          Age:
        </label>
        <input type="text" className="innerBoxCand" id="age" />
        <label className="lable1" htmlFor="gender">
          Gender:
        </label>
        <input type="text" className="innerBoxCand" id="gender" />
        <div>
          <button type="onSubmit" className="RegBtn btn btn-success">
            Register
          </button>
        </div>
      </form>
      <CandidateDisplay />
    </>
  );
};
CandidateRegister.propTypes = {
  account: PropTypes.node.isRequired,
};
export default CandidateRegister;
