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
        const select = document.getElementById("selectNumber");
        const options = await web3.eth.getAccounts();

        for (let i = 0; i < options.length; i++) {
          let opt = options[i];
          let element = document.createElement("option");
          element.textContent = opt;
          element.value = opt;
          select.appendChild(element);
        }
      } catch {
        setProvider("Not connected");
      }
    }

    web3 && allAccounts();
  }, [web3]);

  async function selectAccount() {
    let selectedAccount = document.getElementById("selectNumber").value;

    if (selectedAccount && selectedAccount !== "Select an account") {
      saveAccount(selectedAccount);
    }
  }

  return (
    <>
      <Navigation />
      <form action="lable10" id="myform">
        <label htmlFor="">
          <select
            name="innerBox"
            id="selectNumber"
            onChange={selectAccount}
          >
            <option value=""></option>
          </select>
        </label>
      </form>
    </>
  );
};

AccountList.propTypes = {
  saveAccount: PropTypes.func.isRequired, // Change the prop type to func
};

export default AccountList;
