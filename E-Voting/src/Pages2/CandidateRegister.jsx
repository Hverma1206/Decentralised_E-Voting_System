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

    const verificationRes = await fetch("http://localhost:3000/api/candidate-verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partyData),
    });

    const verificationData = await verificationRes.json();
    console.log(verificationData);

    if (verificationRes.ok) {
      // If verification is successful, register the candidate
      const registrationRes = await fetch("http://localhost:3000/api/register-candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, party, age, gender, account }),
      });

      const registrationData = await registrationRes.json();
      console.log(registrationData);
      alert(registrationData.message);
    } else {
      alert(verificationData.message);
    }
  };

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
          <button type="submit" className="RegBtn btn btn-success">
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
