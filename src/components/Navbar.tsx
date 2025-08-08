import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Users } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { shortenAddress } from '../utils/address';

function Navbar() {
  const location = useLocation();
  const { account, connectWallet, isConnecting, balance, isConnected } = useWeb3();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EthTrust
              </span>
              <span className="text-xs text-gray-500 font-medium">Shared Wallet</span>
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 bg-gray-100/50 rounded-xl p-1">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'bg-white shadow-md text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                }`}
              >
                <Users className="h-4 w-4" />
                <span className="text-sm">Controller</span>
              </Link>
              <Link
                to="/member"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === '/member' 
                    ? 'bg-white shadow-md text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                }`}
              >
                <Users className="h-4 w-4" />
                <span className="text-sm">Member</span>
              </Link>
            </div>

            {/* Wallet Connection */}
            {isConnected ? (
              <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/50 rounded-xl shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">{shortenAddress(account!)}</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <span className="text-sm font-bold text-green-600">{balance} ETH</span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? (
                  <>
                    <div className="spinner"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4" />
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;