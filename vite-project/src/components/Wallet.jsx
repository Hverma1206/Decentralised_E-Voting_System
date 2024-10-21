import { useEffect, useState, createContext } from "react";
import Web3 from "web3"; 
import PropTypes from "prop-types";
import ABI from './ABI.json';

const walletContext = createContext();

const Wallet = ({ children }) => {
    const [state, setState] = useState({
        web3: null,
        contract: null
    });

    useEffect(() => {
        const init = async () => {
          try {
            const web3 = new Web3("http://127.0.0.1:7545");
            const contractAddress = "0xd8Dcf5708ae2645467b38ffAc6f003Ae63896504"; 
            const contract = new web3.eth.Contract(ABI, contractAddress);
            setState({ web3: web3, contract: contract });
          } catch (error) {
            console.error("Error initializing contract:", error);
          }
        };
        init();
      }, []);

    return (
        <walletContext.Provider value={state}>
            {children}
        </walletContext.Provider>
    );
}; 
Wallet.propTypes={
    children:PropTypes.node.isRequired,
}
export {walletContext};
export default Wallet;
