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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Contract Stats */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Wallet className="h-6 w-6 text-mint" />
            <h2 className="text-xl font-semibold text-charcoal">Contract Balance</h2>
          </div>
          <p className="text-3xl font-bold text-charcoal">{balance} ETH</p>
          <p className="text-sm text-gray-500 mt-2">Available for distribution</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-6 w-6 text-mint" />
            <h2 className="text-xl font-semibold text-charcoal">Total Members</h2>
          </div>
          <p className="text-3xl font-bold text-charcoal">{members.length}</p>
          <p className="text-sm text-gray-500 mt-2">Active wallet shares</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Plus className="h-6 w-6 text-mint" />
            <h2 className="text-xl font-semibold text-charcoal">Add Member</h2>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMemberAddress}
              onChange={(e) => setNewMemberAddress(e.target.value)}
              placeholder="Enter wallet address"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
            />
            <button
              onClick={addNewMember}
              className="bg-mint text-charcoal px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-mint" />
            <h2 className="text-xl font-semibold text-charcoal">Members</h2>
          </div>
          <span className="text-sm text-gray-500">{members.length} total members</span>
        </div>
        
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.address} className="bg-lavender rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-mint rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-charcoal" />
                  </div>
                  <span className="font-medium text-charcoal">{member.address}</span>
                </div>
                <button
                  onClick={() => removeMember(member.address)}
                  className="text-coral hover:opacity-80 transition-opacity"
                >
                  Remove
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={member.limit}
                  onChange={(e) => handleLimitChange(member.address, parseFloat(e.target.value))}
                  className="flex-1"
                />
                <input
                  type="number"
                  value={member.limit}
                  onChange={(e) => handleLimitChange(member.address, parseFloat(e.target.value))}
                  className="w-20 px-2 py-1 rounded border border-gray-300"
                  min="0"
                  max="5"
                  step="0.1"
                />
                <span className="text-sm text-charcoal">Used: {member.used} ETH</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RootDashboard;