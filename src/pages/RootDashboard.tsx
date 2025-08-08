import React, { useState } from 'react';
import { Users, Wallet, Plus } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import toast from 'react-hot-toast';

interface Member {
  address: string;
  limit: number;
  used: number;
}

const RootDashboard = () => {
  const { account, balance } = useWeb3();
  const [members, setMembers] = useState<Member[]>([
    { address: '0x1234...5678', limit: 1.0, used: 0.5 },
    { address: '0x8765...4321', limit: 0.5, used: 0.2 },
  ]);
  const [newMemberAddress, setNewMemberAddress] = useState('');

  const handleLimitChange = (address: string, newLimit: number) => {
    // TODO: Implement contract interaction
    setMembers(members.map(member => 
      member.address === address ? { ...member, limit: newLimit } : member
    ));
    toast.success(`Updated limit for ${address}`);
  };

  const addNewMember = () => {
    if (!newMemberAddress) {
      toast.error('Please enter a wallet address');
      return;
    }
    // TODO: Implement contract interaction
    setMembers([...members, { address: newMemberAddress, limit: 0, used: 0 }]);
    setNewMemberAddress('');
    toast.success('New member added successfully!');
  };

  const removeMember = (address: string) => {
    // TODO: Implement contract interaction
    setMembers(members.filter(member => member.address !== address));
    toast.success('Member removed successfully!');
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Controller Dashboard
        </h1>
        <p className="text-gray-600">Manage your shared wallet members and spending limits</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card-hover bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200/50 shadow-card">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Contract Balance</h3>
              <p className="text-sm text-gray-600">Available for distribution</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-2">{balance} ETH</p>
          <div className="flex items-center text-sm text-green-600">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            Active & Funded
          </div>
        </div>

        <div className="card-hover bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 border border-emerald-200/50 shadow-card">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Members</h3>
              <p className="text-sm text-gray-600">Active wallet shares</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-emerald-600 mb-2">{members.length}</p>
          <div className="text-sm text-gray-600">
            {members.reduce((total, member) => total + member.used, 0).toFixed(2)} ETH spent total
          </div>
        </div>

        <div className="card-hover bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-6 border border-purple-200/50 shadow-card">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl shadow-lg">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Add Member</h3>
              <p className="text-sm text-gray-600">Expand your wallet</p>
            </div>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={newMemberAddress}
              onChange={(e) => setNewMemberAddress(e.target.value)}
              placeholder="0x... wallet address"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
            <button
              onClick={addNewMember}
              className="btn-primary w-full"
            >
              Add Member
            </button>
          </div>
        </div>
      </div>

      {/* Members Management */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Member Management</h2>
              <p className="text-gray-600">Configure spending limits and monitor usage</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Members</p>
            <p className="text-2xl font-bold text-blue-600">{members.length}</p>
          </div>
        </div>
        
        {members.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Members Yet</h3>
            <p className="text-gray-500">Add your first member to get started with shared wallet management</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {members.map((member, index) => (
              <div key={member.address} className="card-hover bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">{member.address}</p>
                      <p className="text-sm text-gray-500">Member since today</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeMember(member.address)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors duration-200 font-medium"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Spending Limit</span>
                      <span className="text-sm text-gray-500">{member.limit} ETH</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={member.limit}
                      onChange={(e) => handleLimitChange(member.address, parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Exact Limit (ETH)</label>
                      <input
                        type="number"
                        value={member.limit}
                        onChange={(e) => handleLimitChange(member.address, parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        min="0"
                        max="5"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Used Amount</label>
                      <div className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-gray-800 font-medium">{member.used} ETH</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Usage Progress</span>
                      <span className="text-sm text-gray-500">
                        {member.limit > 0 ? Math.round((member.used / member.limit) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="progress-bar h-full transition-all duration-500"
                        style={{ 
                          width: `${member.limit > 0 ? Math.min((member.used / member.limit) * 100, 100) : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RootDashboard;