// Types for wallet operations
export interface Token {
  id: string
  symbol: string
  name: string
  balance: number
  value: number
  icon?: string
}

export interface WalletAccount {
  id: string
  address: string
  name: string
  balance: number
  tokens: Token[]
}

export interface SwapParams {
  fromToken: string
  toToken: string
  amount: number
  slippage: number
}

export interface TransferParams {
  token: string
  amount: number
  toAddress: string
  memo?: string
}

// Mock data for demonstration
const mockTokens: Token[] = [
  {
    id: "nali",
    symbol: "NALI",
    name: "NALI Token",
    balance: 1250,
    value: 1250 * 0.05, // $0.05 per NALI
    icon: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    balance: 0.05,
    value: 0.05 * 3000, // $3000 per ETH
    icon: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    balance: 75.5,
    value: 75.5, // $1 per USDC
    icon: "/placeholder.svg?height=32&width=32",
  },
]

const mockAccounts: WalletAccount[] = [
  {
    id: "main",
    address: "0x1234...5678",
    name: "Main Wallet",
    balance: 1250 * 0.05 + 0.05 * 3000 + 75.5,
    tokens: mockTokens,
  },
]

// Simulate API calls with promises
export const walletService = {
  // Get all tokens in the wallet
  getTokens: async (): Promise<Token[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTokens), 500)
    })
  },

  // Get all wallet accounts
  getAccounts: async (): Promise<WalletAccount[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAccounts), 500)
    })
  },

  // Swap tokens
  swapTokens: async (params: SwapParams): Promise<{ success: boolean; txHash: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
        })
      }, 2000)
    })
  },

  // Send tokens to another address
  sendTokens: async (params: TransferParams): Promise<{ success: boolean; txHash: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
        })
      }, 2000)
    })
  },

  // Get a wallet address for receiving tokens
  getReceiveAddress: async (): Promise<{ address: string; qrCode: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          address: "0x1234...5678",
          qrCode: "/placeholder.svg?height=200&width=200",
        })
      }, 500)
    })
  },

  // Transfer tokens between accounts within the app
  transferBetweenAccounts: async (
    params: TransferParams & { fromAccount: string; toAccount: string },
  ): Promise<{ success: boolean; txHash: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
        })
      }, 1500)
    })
  },

  // Create a new wallet within the app
  createWallet: async (name: string): Promise<WalletAccount> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newWallet: WalletAccount = {
          id: `wallet-${Math.random().toString(16).substring(2, 10)}`,
          address: `0x${Math.random().toString(16).substring(2, 30)}`,
          name,
          balance: 0,
          tokens: [],
        }
        resolve(newWallet)
      }, 1000)
    })
  },
}
