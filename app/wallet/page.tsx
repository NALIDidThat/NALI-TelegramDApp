"use client"

import { TokenWallet } from "@/components/wallet/token-wallet"
import AppLayout from "@/components/layout/app-layout"

export default function WalletPage() {
  return (
    <AppLayout>
      <div className="max-w-md mx-auto pb-20">
        <TokenWallet />
      </div>
    </AppLayout>
  )
}
