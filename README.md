# EthTrust - Shared Wallet DApp 💳

A decentralized application (DApp) built on Ethereum that enables shared wallet management with spending limits for multiple members. Perfect for families, teams, or organizations that need controlled access to shared funds.

## ✨ Features

- **Controller Management**: Designated controller can manage all wallet members
- **Member Limits**: Set individual spending limits for each member
- **Real-time Tracking**: Monitor spending across all members
- **Secure Withdrawals**: Members can only withdraw within their allocated limits
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Web3 Integration**: Seamless MetaMask wallet connection

## 🏗️ Project Structure

```
├── src/
│   ├── components/
│   │   └── Navbar.tsx              # Navigation component
│   ├── context/
│   │   └── Web3Context.tsx         # Web3 state management
│   ├── contracts/
│   │   ├── EthTrust.sol            # Smart contract
│   │   └── contract-interface.ts   # Contract interface
│   ├── hooks/
│   │   └── useEthTrust.ts          # Contract interaction hooks
│   ├── pages/
│   │   ├── RootDashboard.tsx       # Controller dashboard
│   │   └── MemberDashboard.tsx     # Member dashboard
│   ├── utils/
│   │   └── address.ts              # Address utilities
│   └── App.tsx                     # Main app component
├── package.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension
- Ethereum testnet ETH (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shared_wallet_web3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Smart Contract Functions

### Controller Functions
- `addMember(address, limit)` - Add a new member with spending limit
- `removeMember(address)` - Remove a member from the wallet
- `setLimit(address, newLimit)` - Update a member's spending limit

### Member Functions
- `makePurchase(amount)` - Withdraw funds (within limit)
- `getMember(address)` - Get member details

### View Functions
- `controller()` - Get controller address
- `totalMembers()` - Get total number of members
- `members(address)` - Get member information

## 🎯 Usage

### For Controllers

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Add Members**: Enter member wallet address and set their spending limit
3. **Manage Limits**: Adjust spending limits for existing members
4. **Monitor Activity**: Track member spending in real-time
5. **Fund Wallet**: Send ETH to the contract address to fund member withdrawals

### For Members

1. **Connect Wallet**: Connect your authorized wallet address
2. **View Status**: Check your spending limit and current usage
3. **Make Withdrawals**: Withdraw funds within your allocated limit
4. **Track Spending**: Monitor your spending history

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Web3**: Ethers.js v6
- **Smart Contract**: Solidity ^0.8.20
- **Routing**: React Router v6
- **State Management**: React Context API
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏭 Deployment

### Smart Contract Deployment

1. **Compile the contract** using your preferred tool (Hardhat, Remix, etc.)
2. **Deploy to your chosen network** (testnet recommended for testing)
3. **Update contract address** in the application configuration

### Frontend Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting platform** (Vercel, Netlify, etc.)

## 🔐 Security Features

- **Access Control**: Only controller can manage members
- **Spending Limits**: Automatic enforcement of individual limits
- **Balance Validation**: Prevents overdrafts from contract
- **Address Validation**: Prevents invalid addresses
- **Member Verification**: Only active members can make withdrawals

## 🧪 Testing

### Local Testing

1. **Use a testnet** (Goerli, Sepolia, etc.)
2. **Get testnet ETH** from faucets
3. **Deploy contract** to testnet
4. **Connect with test accounts** to simulate different roles

### Test Scenarios

- Controller adding/removing members
- Setting and updating spending limits
- Member withdrawals within limits
- Attempting withdrawals beyond limits
- Contract funding and balance management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🚨 Disclaimer

This is educational/demonstration software. Use at your own risk. Always audit smart contracts before deploying to mainnet with real funds.

## 📞 Support

For questions and support, please open an issue in the GitHub repository.

---

**Built with ❤️ for the Web3 community**
