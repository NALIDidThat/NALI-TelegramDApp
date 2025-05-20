"use client"

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

const roles = [
  {
    id: "student",
    label: "Continue as a Student",
    color: "bg-[#f20789] text-white",
    nextStep: "/onboarding/student/flow/screen1"
  },
  {
    id: "parent",
    label: "Log in as a Parent",
    color: "bg-[#f20789] text-white",
    nextStep: "/onboarding/parent/step1"
  },
  {
    id: "school",
    label: "Log in with School",
    color: "bg-[#f20789] text-white",
    nextStep: "/onboarding/teacher/step1"
  },
  {
    id: "company",
    label: "Log in with Company",
    color: "bg-[#f20789] text-white",
    nextStep: "/onboarding/hub-manager/step1"
  },
  {
    id: "email",
    label: "Continue with Email",
    color: "bg-[#f20789] text-white",
    nextStep: "/auth/email"
  },
]

export default function WalletConnectPage() {
  const router = useRouter();
  const dynamicWidgetRef = useRef<any>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f7fa] py-8 px-2">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 relative">
        {/* Illustration */}
        <img
          src="/images/rocket-illustration-v2.png"
          alt="Sign up illustration"
          className="w-32 h-32 object-contain mx-auto mb-4 mt-2"
        />
        {/* Heading and subheading */}
        <h1 className="text-2xl font-extrabold text-[#222] text-center mb-2">Login or sign up</h1>
        <p className="text-gray-500 text-center mb-6 text-base">
          Please select your preferred method to continue setting up your account
        </p>
        {/* Wallet connect button */}
        <DynamicContextProvider
          settings={{
            environmentId: "da2ca72a-8592-47e2-a176-be86c9aff538",
            walletConnectors: [
              BitcoinWalletConnectors,
              EthereumWalletConnectors,
              SolanaWalletConnectors,
            ],
          }}
        >
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <DynamicWagmiConnector>
                <DynamicWidget
                  buttonClassName="w-full py-4 rounded-2xl font-bold text-lg mb-3 bg-[#f20789] text-white shadow-md hover:bg-[#FF0099] transition"
                />
              </DynamicWagmiConnector>
            </QueryClientProvider>
          </WagmiProvider>
        </DynamicContextProvider>
        {/* Role and login method buttons */}
        {roles.map((role) => (
          <button
            key={role.id}
            className={`w-full py-4 rounded-2xl font-bold text-lg mb-3 ${role.color} shadow-md hover:bg-[#FF0099] transition`}
            onClick={() => router.push(role.nextStep)}
          >
            {role.label}
          </button>
        ))}
        {/* Phone login button */}
        <button className="w-full py-4 rounded-2xl font-bold text-lg mb-3 bg-white text-[#222] border border-gray-200 shadow-sm hover:bg-gray-50 transition">
          Continue with Phone
        </button>
        {/* Social login buttons */}
        <div className="flex w-full gap-3 mt-2 mb-4">
          <button className="flex-1 flex items-center justify-center py-3 rounded-xl border border-gray-200 bg-white text-[#222] shadow-sm hover:bg-gray-50 transition">
            <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#EA4335" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.242 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.625c-1.703-1.57-3.891-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.148-.156-1.684z"/></svg>
          </button>
          <button className="flex-1 flex items-center justify-center py-3 rounded-xl border border-gray-200 bg-white text-[#222] shadow-sm hover:bg-gray-50 transition">
            <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#000" d="M16.365 1.43c0 .77-.625 1.395-1.395 1.395-.77 0-1.395-.625-1.395-1.395 0-.77.625-1.395 1.395-1.395.77 0 1.395.625 1.395 1.395zm-7.73 0c0 .77-.625 1.395-1.395 1.395-.77 0-1.395-.625-1.395-1.395 0-.77.625-1.395 1.395-1.395.77 0 1.395.625 1.395 1.395zm7.73 21.14c0 .77-.625 1.395-1.395 1.395-.77 0-1.395-.625-1.395-1.395 0-.77.625-1.395 1.395-1.395.77 0 1.395.625 1.395 1.395zm-7.73 0c0 .77-.625 1.395-1.395 1.395-.77 0-1.395-.625-1.395-1.395 0-.77.625-1.395 1.395-1.395.77 0 1.395.625 1.395 1.395zm10.365-10.57c0-4.418-3.582-8-8-8s-8 3.582-8 8 3.582 8 8 8 8-3.582 8-8zm-8 6.5c-3.584 0-6.5-2.916-6.5-6.5s2.916-6.5 6.5-6.5 6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5z"/></svg>
          </button>
        </div>
        {/* Legal text */}
        <p className="text-xs text-gray-400 text-center mt-2">
          If you are creating a new account,<br />
          <a href="#" className="underline">Terms & Conditions</a> and <a href="#" className="underline">Privacy Policy</a> will apply.
        </p>
      </div>
    </div>
  );
} 