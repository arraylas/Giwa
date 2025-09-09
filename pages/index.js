'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWalletClient } from 'wagmi';
import { parseEther } from 'viem';
import { depositTransaction } from 'viem/op-stack';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [depositAmount, setDepositAmount] = useState('0.001');
  const [status, setStatus] = useState('');

  async function handleDeposit() {
    if (!walletClient) return alert('Please connect wallet first');
    setStatus('Sending deposit transaction...');
    try {
      const hash = await depositTransaction(walletClient, {
        request: {
          to: address,
          value: parseEther(depositAmount),
          data: '0x',
        },
      });
      setStatus('Deposit tx sent: ' + hash);
      console.log('Deposit tx hash', hash);
    } catch (err) {
      console.error(err);
      setStatus('Deposit failed: ' + (err && err.message ? err.message : String(err)));
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: 'Inter, Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Giwa Bridge UI</h1>
        <ConnectButton />
      </div>

      <div style={{ marginTop: 20 }}>
        <h2>Deposit L1 → L2</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input value={depositAmount} onChange={(e)=>setDepositAmount(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
          <button onClick={handleDeposit} style={{ padding: '8px 12px', borderRadius: 6, background: '#2563eb', color: 'white', border: 'none' }}>Deposit</button>
        </div>
        <div style={{ marginTop: 12 }}>{status}</div>
      </div>

      <div style={{ marginTop: 32 }}>
        <h2>Withdraw (initiate only)</h2>
        <p>Withdraw flow requires additional prove & finalize steps not handled here yet.</p>
      </div>
    </div>
  );
}
