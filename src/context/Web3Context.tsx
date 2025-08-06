import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

// Add TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  account: string | null;
  connectWallet: () => Promise<void>;
  provider: ethers.Provider | null;
  signer: ethers.Signer | null;
  isConnecting: boolean;
  balance: string;
  isConnected: boolean;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!');
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      
      if (network.chainId !== 1n) { // Sepolia chainId
        toast.error('Please connect to Sepolia Testnet!');
        return;
      }

      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const balance = await provider.getBalance(accounts[0]);

      setProvider(provider);
      setSigner(signer);
      setAccount(accounts[0]);
      setBalance(ethers.formatEther(balance));
      setIsConnected(true);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
        setIsConnected(!!accounts[0]);
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            connectWallet();
          }
        });
    }
  }, []);

  return (
    <Web3Context.Provider value={{
      account,
      connectWallet,
      provider,
      signer,
      isConnecting,
      balance,
      isConnected
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}