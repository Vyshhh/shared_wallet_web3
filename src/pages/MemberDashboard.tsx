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
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Member Dashboard
        </h1>
        <p className="text-gray-600">Monitor your spending limits and make secure withdrawals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Wallet Card */}
        <div className="lg:col-span-2 card-hover bg-gradient-to-br from-white to-blue-50/30 rounded-3xl shadow-xl border border-blue-100/50 p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl shadow-lg">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Your Wallet</h2>
              <p className="text-gray-600">Manage your ETH transactions</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 border border-emerald-200/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-emerald-700">Spending Limit</span>
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-1">{personalLimit} ETH</div>
              <span className="text-sm text-emerald-600">Maximum allowed</span>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">Used Amount</span>
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{usedAmount} ETH</div>
              <span className="text-sm text-blue-600">Current usage</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">Usage Progress</span>
              <span className="text-sm text-gray-500">
                {personalLimit > 0 ? Math.round((usedAmount / personalLimit) * 100) : 0}% used
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div 
                className="progress-bar h-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${personalLimit > 0 ? Math.min((usedAmount / personalLimit) * 100, 100) : 0}%` 
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 ETH</span>
              <span>{personalLimit} ETH</span>
            </div>
          </div>

          {/* Deposit Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Make Withdrawal</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (ETH)</label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  min="0"
                  max={personalLimit - usedAmount}
                  step="0.01"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available: {(personalLimit - usedAmount).toFixed(2)} ETH
                </p>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleDeposit}
                  className="btn-primary px-8 py-3 h-fit"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Info Card */}
        <div className="space-y-6">
          <div className="card-hover bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Contract Balance</h3>
                <p className="text-sm text-gray-600">Total funds available</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-2">{balance} ETH</p>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-green-600 font-medium">Contract Active</span>
            </div>
          </div>

          <div className="card-hover bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Quick Stats</h3>
                <p className="text-sm text-gray-600">Your wallet status</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Remaining Limit</span>
                <span className="text-sm font-semibold text-emerald-600">
                  {(personalLimit - usedAmount).toFixed(2)} ETH
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Members</span>
                <span className="text-sm font-semibold text-blue-600">{members.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Your Status</span>
                <span className="text-sm font-semibold text-green-600">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Members Overview */}
      <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">All Members</h2>
              <p className="text-gray-600">Overview of wallet participants</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Members</p>
            <p className="text-2xl font-bold text-blue-600">{members.length}</p>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Member</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">Limit</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">Used</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">Available</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Progress</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {members.map((member, index) => (
                  <tr key={member.address} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="font-medium text-gray-800">{member.address}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold text-gray-700">{member.limit} ETH</td>
                    <td className="text-right py-4 px-6 font-semibold text-blue-600">{member.used} ETH</td>
                    <td className="text-right py-4 px-6 font-semibold text-emerald-600">
                      {(member.limit - member.used).toFixed(2)} ETH
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${member.limit > 0 ? Math.min((member.used / member.limit) * 100, 100) : 0}%` 
                            }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-500">
                          {member.limit > 0 ? Math.round((member.used / member.limit) * 100) : 0}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;