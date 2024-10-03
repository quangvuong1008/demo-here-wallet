'use client';

import { useEffect, useState } from 'react';
import { HereWallet } from "@here-wallet/core";

declare global {
  interface Window {
    Telegram: TelegramWebApp;
  }
}
// Define the TelegramWebApp interface
interface TelegramWebApp {
  ready: () => void;
  // Add other properties and methods as needed
}

export default function TelegramMiniApp() {
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    const tgApp = window.Telegram?.WebApp;
    if (tgApp) {
      tgApp.ready();
    }
  }, []);

  const connectWallet = async () => {
    try {
      const here = await HereWallet.connect();
      const { accountId } = await here.authenticate();
      setWallet(accountId)
    } catch (error) {
      console.error("Failed to connect to HOT Wallet:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <h1>Telegram Mini App with HOT Wallet</h1>
      {!wallet ? (
        <button onClick={connectWallet}>Connect HOT Wallet</button>
      ) : (
        <p>Wallet connected: {wallet}</p>
      )}
      {/* Add more UI components and functionality as needed */}
    </div>
  );
}