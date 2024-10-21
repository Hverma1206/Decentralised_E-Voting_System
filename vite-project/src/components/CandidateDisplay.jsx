import { useContext, useEffect, useState } from "react";
import { walletContext } from "./Wallet";

const CandidateDisplay = () => {
  const { contract } = useContext(walletContext);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const candidateInfo = async () => {
      try {
        const candidatesData = await contract.methods.candidateList().call();
        console.log(candidatesData);
        setCandidates(candidatesData);
      } catch (error) {
        console.error("Error fetching candidate information:", error);
      }
    };

    contract && candidateInfo();
  }, [contract]);

  return (
    <div> 
      {candidates.map((candidate) => (
        <div key={candidate.candidateId}>
          <p>Candidate's Information</p>
          <ul> 
            <li>Id: {candidate.candidateId}</li>
            <li>Name: {candidate.name}</li>
            <li>Address: {candidate.candidateAddress}</li>
            <li>Age: {candidate.age}</li>
            <li>Party: {candidate.party}</li>
            <li>Gender: {candidate.gender}</li>
            <li>Votes: {candidate.votes}</li>
          </ul>
        </div>
      ))}
    </div>
  );
  
};

export default CandidateDisplay;
