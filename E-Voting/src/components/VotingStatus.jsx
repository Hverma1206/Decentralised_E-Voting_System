import { useState,useEffect,useContext } from "react";
import { walletContext } from "../components/Wallet";
import PropTypes from "prop-types";

const VotingStatus=({account})=>{
    const { contract } = useContext(walletContext);
    const [state, setState] = useState("");
  
    useEffect(() => {
      const checkVoting = async () => {
        try {
          const vState= await contract.methods.votingStatus().call();
          setState(vState);
        } catch (error) {
          console.error("Error fetching in voting information:", error);
        }
      }
      contract && checkVoting();
    }, [contract]);
  return(
    <>
        <div>
            Voting Status: {state};
        </div>
    </>
  )
}
VotingStatus.propTypes = {
    account: PropTypes.node.isRequired,
}
export default VotingStatus;