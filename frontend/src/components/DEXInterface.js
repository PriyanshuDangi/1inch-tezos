import React, { useState, useEffect } from 'react';
import { 
  FiArrowRight, 
  FiArrowLeft, 
  FiRefreshCw, 
  FiCreditCard, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiLoader 
} from 'react-icons/fi';

const DEXInterface = () => {
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('tezos');
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(1.0);

  const chains = {
    ethereum: {
      name: 'Ethereum',
      symbol: 'ETH',
      color: 'ethereum',
      icon: '🔷',
      decimals: 18
    },
    tezos: {
      name: 'Tezos',
      symbol: 'XTZ',
      color: 'tezos',
      icon: '🔵',
      decimals: 6
    }
  };

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWalletConnected(true);
      setTransactionStatus({ type: 'success', message: 'Wallet connected successfully!' });
    } catch (error) {
      setTransactionStatus({ type: 'error', message: 'Failed to connect wallet' });
    } finally {
      setIsLoading(false);
    }
  };

  const swapChains = () => {
    setFromChain(toChain);
    setToChain(fromChain);
    setAmount('');
  };

  const handleTransfer = async () => {
    if (!amount || !recipientAddress) {
      setTransactionStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);
    setTransactionStatus(null);

    try {
      // Simulate cross-chain transfer
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setTransactionStatus({
        type: 'success',
        message: `Successfully initiated transfer of ${amount} ${chains[fromChain].symbol} from ${chains[fromChain].name} to ${chains[toChain].name}`
      });
      
      // Reset form
      setAmount('');
      setRecipientAddress('');
    } catch (error) {
      setTransactionStatus({
        type: 'error',
        message: 'Transfer failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const estimatedAmount = amount ? (parseFloat(amount) * exchangeRate).toFixed(6) : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Cross-Chain DEX
          </h1>
          <p className="text-gray-600 text-lg">
            Transfer assets between Ethereum and Tezos seamlessly
          </p>
        </div>

        {/* Main DEX Interface */}
        <div className="card p-8">
          {/* Wallet Connection */}
          <div className="mb-6">
            {!walletConnected ? (
              <button
                onClick={connectWallet}
                disabled={isLoading}
                className="btn-primary flex items-center gap-2"
              >
                <FiCreditCard size={20} />
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <FiCheckCircle size={20} />
                <span className="font-semibold">Wallet Connected</span>
              </div>
            )}
          </div>

          {/* Transfer Form */}
          <div className="space-y-6">
            {/* From Chain */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                From
              </label>
              <div className="flex items-center gap-4">
                <div className={`flex-1 p-4 rounded-lg border-2 border-${chains[fromChain].color}-200 bg-${chains[fromChain].color}-50`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{chains[fromChain].icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{chains[fromChain].name}</div>
                      <div className="text-sm text-gray-600">{chains[fromChain].symbol}</div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={swapChains}
                  className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <FiArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="input-field pr-20"
                  disabled={!walletConnected}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  {chains[fromChain].symbol}
                </div>
              </div>
            </div>

            {/* To Chain */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                To
              </label>
              <div className={`p-4 rounded-lg border-2 border-${chains[toChain].color}-200 bg-${chains[toChain].color}-50`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{chains[toChain].icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{chains[toChain].name}</div>
                    <div className="text-sm text-gray-600">{chains[toChain].symbol}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estimated Amount */}
            {amount && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Estimated amount:</span>
                  <span className="font-semibold text-gray-900">
                    {estimatedAmount} {chains[toChain].symbol}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">Exchange rate:</span>
                  <span className="text-sm text-gray-600">
                    1 {chains[fromChain].symbol} = {exchangeRate} {chains[toChain].symbol}
                  </span>
                </div>
              </div>
            )}

            {/* Recipient Address */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder={`${chains[toChain].name} address`}
                className="input-field"
                disabled={!walletConnected}
              />
            </div>

            {/* Transfer Button */}
            <button
              onClick={handleTransfer}
              disabled={!walletConnected || isLoading || !amount || !recipientAddress}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FiLoader size={20} className="animate-spin" />
                  Processing Transfer...
                </>
              ) : (
                <>
                  <FiArrowRight size={20} />
                  Transfer {amount} {chains[fromChain].symbol} to {chains[toChain].name}
                </>
              )}
            </button>
          </div>

          {/* Transaction Status */}
          {transactionStatus && (
            <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
              transactionStatus.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {transactionStatus.type === 'success' ? (
                <FiCheckCircle size={20} />
              ) : (
                <FiAlertCircle size={20} />
              )}
              <span>{transactionStatus.message}</span>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
            <p className="text-gray-600 text-sm">
              Advanced cryptography ensures your assets are safe during cross-chain transfers
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast</h3>
            <p className="text-gray-600 text-sm">
              Optimized protocols enable quick transfers between Ethereum and Tezos
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-semibold text-gray-900 mb-2">Low Fees</h3>
            <p className="text-gray-600 text-sm">
              Competitive fees with transparent pricing for all cross-chain operations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DEXInterface; 