import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Wallet from "./components/Wallet";
import AccountList from "./Pages2/AccountList";
import CandidateRegister from "./Pages2/CandidateRegister";
import ElectionCommision from "./Pages2/ElectionCommision";
import VoterRegister from "./Pages2/VoterRegister";
import { useState } from "react";
import ConnectedAccount from "./components/Connected";
function App() {
  const [account,setAccount]=useState("");
  const saveAccount = (address) => {
    setAccount(address);
  };

  const router = createBrowserRouter([
    { path: "/", element: <AccountList saveAccount={saveAccount} /> },
    { path: "/candidate", element: <CandidateRegister account={account}/> },
    { path: "/voter", element: <VoterRegister account={account}/> },
    { path: "/election_commision", element: <ElectionCommision account={account}/> }
  ]);

  return (
    <>
    <ConnectedAccount account={account}/>
      <Wallet>
        <RouterProvider router={router}></RouterProvider>
      </Wallet>
    </>
  );
}

export default App;
