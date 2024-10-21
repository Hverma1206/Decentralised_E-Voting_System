// src/hooks/useWallet.js
import { useEffect, useState, useContext } from 'react';
import { walletContext } from '../components/Wallet'; // Adjust the import path as needed

export const useWallet = () => {
    const { saveAccount } = useContext(walletContext); // Assuming you have a context provider for wallet
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const connectWallet = async () => {
            if (window.ethereum) {
                try {
                    // Request account access
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        const currentAccount = accounts[0];
                        setAccount(currentAccount);
                        saveAccount(currentAccount); // Save to context or state
                    } else {
                        console.error("No accounts found");
                    }
                } catch (error) {
                    console.error("User denied account access:", error);
                }
            } else {
                console.error("No Ethereum provider found");
            }
        };

        connectWallet();
    }, [saveAccount]); // Runs once on mount

    return { account };
};
