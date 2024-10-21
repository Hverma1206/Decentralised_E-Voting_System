import "./VoterDisplay.css";
import { useContext, useEffect, useState } from "react";
import { walletContext } from "./Wallet";

const VoterDisplay = () => {
  const { contract } = useContext(walletContext);
  const [voter, setVoter] = useState([]);

  useEffect(() => {
    const voterInfo = async () => {
      try {
        const VotersData = await contract.methods.voterList().call();
        console.log(VotersData);
        setVoter(VotersData);
      } catch (error) {
        console.error("Error fetching in voter information:", error);
      }
    };

    contract && voterInfo();
  }, [contract]);

  return (
    <>
      {voter.map((voter, index) => {
        return (<>
        <p>Voter's Information</p>
          <ul key={voter.voterId}>
          <li>Id:{voter.voterId}</li>
            <li>Name:{voter.name}</li>
            <li>Age:{voter.age}</li>
            <li>Gender:{voter.gender}</li>
          </ul>
          </>
        );
      })}
    </>
  );
};

export default VoterDisplay;
