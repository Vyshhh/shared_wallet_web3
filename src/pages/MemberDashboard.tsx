import React, { useState } from 'react';
import { Wallet, Users } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import toast from 'react-hot-toast';

interface Member {
  address: string;
  limit: number;
  used: number;
}

const MemberDashboard = () => {
  const { account, balance } = useWeb3();
  const [personalLimit, setPersonalLimit] = useState(1.0);
  const [usedAmount, setUsedAmount] = useState(0.3);
  const [depositAmount, setDepositAmount] = useState('');
  const [members, setMembers] = useState<Member[]>([
    { address: '0x1234...5678', limit: 1.0, used: 0.5 },
    { address: '0x8765...4321', limit: 0.5, used: 0.2 },
  ]);

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (amount + usedAmount > personalLimit) {
      toast.error('Amount exceeds your limit');
      return;
    }
    // TODO: Implement contract interaction
    toast.success('Deposit successful!');
    setDepositAmount('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Personal Stats */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Wallet className="h-6 w-6 text-mint" />
          <h2 className="text-xl font-semibold text-charcoal">Your Wallet</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-lavender rounded-xl p-4">
            <span className="text-sm text-charcoal">ETH Limit</span>
            <div className="text-2xl font-bold text-charcoal">{personalLimit} ETH</div>
            <span className="text-sm text-gray-500">Maximum allowed</span>
          </div>
          <div className="bg-lavender rounded-xl p-4">
            <span className="text-sm text-charcoal">Used Amount</span>
            <div className="text-2xl font-bold text-charcoal">{usedAmount} ETH</div>
            <span className="text-sm text-gray-500">Current usage</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Amount to deposit"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
          />
          <button
            onClick={handleDeposit}
            className="bg-mint text-charcoal font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Deposit
          </button>
        </div>
      </div>

      {/* Contract Balance */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Wallet className="h-6 w-6 text-mint" />
          <h2 className="text-xl font-semibold text-charcoal">Contract Balance</h2>
        </div>
        <p className="text-3xl font-bold text-charcoal">{balance} ETH</p>
        <p className="text-sm text-gray-500 mt-2">Total funds in contract</p>
      </div>

      {/* Members Table */}
      <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-mint" />
            <h2 className="text-xl font-semibold text-charcoal">All Members</h2>
          </div>
          <span className="text-sm text-gray-500">{members.length} total members</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Address</th>
                <th className="text-right py-3 px-4">Limit</th>
                <th className="text-right py-3 px-4">Used</th>
                <th className="text-right py-3 px-4">Available</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.address} className="border-b border-gray-100">
                  <td className="py-3 px-4">{member.address}</td>
                  <td className="text-right py-3 px-4">{member.limit} ETH</td>
                  <td className="text-right py-3 px-4">{member.used} ETH</td>
                  <td className="text-right py-3 px-4">{(member.limit - member.used).toFixed(2)} ETH</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;