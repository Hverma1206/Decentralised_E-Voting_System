import "./AccountList.css";
import { useEffect, useContext } from "react";
import Navigation from "../components/Navigation";
import PropTypes from "prop-types";
import { walletContext } from "../components/Wallet";

const AccountList = ({ saveAccount }) => {
  const { web3 } = useContext(walletContext);

  useEffect(() => {
    async function allAccounts() {
      try {
        const select = document.getElementById("selectAccount");
        select.innerHTML = ""; // Clear previous accounts
        const accounts = await web3.eth.getAccounts();
        
        accounts.forEach(account => {
          const option = document.createElement("option");
          option.value = account;
          option.text = account;
          select.appendChild(option);
        });
      } catch (error) {
        console.error("Error fetching accounts: ", error);
      }
    }
    allAccounts();
  }, [web3]);

  return (
    <>
      <Navigation />
      <label htmlFor="selectAccount" className="label">Select an Account:</label>
      <select id="selectAccount" onChange={(e) => saveAccount(e.target.value)}>
        <option value="">Select Account</option>
      </select>
    </>
  );
};

AccountList.propTypes = {
  saveAccount: PropTypes.func.isRequired, // Ensure correct type for saveAccount
};

export default AccountList;
