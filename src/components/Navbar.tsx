import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Users } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { shortenAddress } from '../utils/address';

function Navbar() {
  const location = useLocation();
  const { account, connectWallet, isConnecting, balance, isConnected } = useWeb3();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wallet className="h-8 w-8 text-mint" />
            <span className="text-2xl font-semibold text-charcoal">Eth Trust</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg ${
                location.pathname === '/' ? 'bg-mint text-charcoal' : 'text-charcoal hover:bg-lavender'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Root</span>
            </Link>
            <Link
              to="/member"
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg ${
                location.pathname === '/member' ? 'bg-mint text-charcoal' : 'text-charcoal hover:bg-lavender'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Member</span>
            </Link>

            {isConnected ? (
              <div className="flex items-center space-x-2 px-4 py-2 bg-lavender rounded-lg">
                <span className="text-sm font-medium text-charcoal">{shortenAddress(account!)}</span>
                <span className="text-sm font-medium text-charcoal">({balance} ETH)</span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="px-4 py-2 bg-mint text-charcoal rounded-lg hover:opacity-90 disabled:opacity-50 transition-all duration-200"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;