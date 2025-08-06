import { useEffect, useState, useCallback } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { EthTrustContract } from '../contracts/contract-interface';
import toast from 'react-hot-toast';

export function useEthTrust() {
  const { provider, signer, account } = useWeb3();
  const [contract, setContract] = useState<EthTrustContract | null>(null);
  const [isController, setIsController] = useState(false);
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    if (provider && signer) {
      const ethTrust = new EthTrustContract(provider, signer);
      setContract(ethTrust);

      // Check if connected account is controller
      ethTrust.getController().then(controller => {
        setIsController(controller.toLowerCase() === account?.toLowerCase());
      });

      // Get total members
      ethTrust.getTotalMembers().then(setTotalMembers);
    }
  }, [provider, signer, account]);

  const addMember = useCallback(async (address: string, limit: number) => {
    if (!contract) return;
    try {
      const tx = await contract.addMember(address, limit);
      await tx.wait();
      toast.success('Member added successfully');
    } catch (error) {
      console.error('Error adding member:', error);
      toast.error('Failed to add member');
    }
  }, [contract]);

  const removeMember = useCallback(async (address: string) => {
    if (!contract) return;
    try {
      const tx = await contract.removeMember(address);
      await tx.wait();
      toast.success('Member removed successfully');
    } catch (error) {
      console.error('Error removing member:', error);
      toast.error('Failed to remove member');
    }
  }, [contract]);

  const setLimit = useCallback(async (address: string, newLimit: number) => {
    if (!contract) return;
    try {
      const tx = await contract.setLimit(address, newLimit);
      await tx.wait();
      toast.success('Limit updated successfully');
    } catch (error) {
      console.error('Error updating limit:', error);
      toast.error('Failed to update limit');
    }
  }, [contract]);

  const makePurchase = useCallback(async (amount: number) => {
    if (!contract) return;
    try {
      const tx = await contract.makePurchase(amount);
      await tx.wait();
      toast.success('Purchase completed successfully');
    } catch (error) {
      console.error('Error making purchase:', error);
      toast.error('Failed to make purchase');
    }
  }, [contract]);

  return {
    contract,
    isController,
    totalMembers,
    addMember,
    removeMember,
    setLimit,
    makePurchase
  };
}