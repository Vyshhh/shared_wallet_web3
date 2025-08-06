import { ethers } from 'ethers';

export const ETH_TRUST_ABI = [
  "function controller() view returns (address)",
  "function totalMembers() view returns (uint256)",
  "function members(address) view returns (bool isActive, uint256 limit, uint256 used)",
  "function addMember(address _member, uint256 _limit)",
  "function removeMember(address _member)",
  "function setLimit(address _member, uint256 _newLimit)",
  "function makePurchase(uint256 _amount)",
  "function getMember(address _member) view returns (bool isActive, uint256 limit, uint256 used)",
  "event MemberAdded(address indexed member, uint256 limit)",
  "event MemberRemoved(address indexed member)",
  "event LimitUpdated(address indexed member, uint256 newLimit)",
  "event PurchaseCompleted(address indexed member, uint256 amount)"
];

export const ETH_TRUST_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export class EthTrustContract {
  private contract: ethers.Contract;

  constructor(provider: ethers.Provider, signer?: ethers.Signer) {
    this.contract = new ethers.Contract(
      ETH_TRUST_ADDRESS,
      ETH_TRUST_ABI,
      signer || provider
    );
  }

  async getController(): Promise<string> {
    return await this.contract.controller();
  }

  async getTotalMembers(): Promise<number> {
    const total = await this.contract.totalMembers();
    return Number(total);
  }

  async getMember(address: string): Promise<{
    isActive: boolean;
    limit: number;
    used: number;
  }> {
    const member = await this.contract.getMember(address);
    return {
      isActive: member[0],
      limit: Number(ethers.formatEther(member[1])),
      used: Number(ethers.formatEther(member[2]))
    };
  }

  async addMember(memberAddress: string, limitInEth: number): Promise<ethers.ContractTransactionResponse> {
    const limitInWei = ethers.parseEther(limitInEth.toString());
    return await this.contract.addMember(memberAddress, limitInWei);
  }

  async removeMember(memberAddress: string): Promise<ethers.ContractTransactionResponse> {
    return await this.contract.removeMember(memberAddress);
  }

  async setLimit(memberAddress: string, newLimitInEth: number): Promise<ethers.ContractTransactionResponse> {
    const limitInWei = ethers.parseEther(newLimitInEth.toString());
    return await this.contract.setLimit(memberAddress, limitInWei);
  }

  async makePurchase(amountInEth: number): Promise<ethers.ContractTransactionResponse> {
    const amountInWei = ethers.parseEther(amountInEth.toString());
    return await this.contract.makePurchase(amountInWei);
  }

  onMemberAdded(callback: (member: string, limit: number) => void): ethers.Listener {
    return this.contract.on("MemberAdded", (member: string, limit: bigint) => {
      callback(member, Number(ethers.formatEther(limit)));
    });
  }

  onMemberRemoved(callback: (member: string) => void): ethers.Listener {
    return this.contract.on("MemberRemoved", callback);
  }

  onLimitUpdated(callback: (member: string, newLimit: number) => void): ethers.Listener {
    return this.contract.on("LimitUpdated", (member: string, newLimit: bigint) => {
      callback(member, Number(ethers.formatEther(newLimit)));
    });
  }

  onPurchaseCompleted(callback: (member: string, amount: number) => void): ethers.Listener {
    return this.contract.on("PurchaseCompleted", (member: string, amount: bigint) => {
      callback(member, Number(ethers.formatEther(amount)));
    });
  }
}