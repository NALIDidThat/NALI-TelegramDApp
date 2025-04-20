"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeftRight,
  Send,
  RefreshCw,
  Plus,
  AlertCircle,
  Copy,
  Loader2,
  ChevronRight,
  Coins,
  Clock,
  CheckCircle2,
} from "lucide-react"
import {
  walletService,
  type Token,
  type WalletAccount,
  type SwapParams,
  type TransferParams,
} from "@/lib/wallet-service"

export function TokenWallet() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [accounts, setAccounts] = useState<WalletAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("tokens")

  // Swap state
  const [swapFrom, setSwapFrom] = useState<string>("")
  const [swapTo, setSwapTo] = useState<string>("")
  const [swapAmount, setSwapAmount] = useState<string>("")
  const [swapSlippage, setSwapSlippage] = useState<number>(0.5)
  const [swapping, setSwapping] = useState(false)
  const [swapSuccess, setSwapSuccess] = useState<{ txHash: string } | null>(null)

  // Send state
  const [sendToken, setSendToken] = useState<string>("")
  const [sendAmount, setSendAmount] = useState<string>("")
  const [sendAddress, setSendAddress] = useState<string>("")
  const [sendMemo, setSendMemo] = useState<string>("")
  const [sending, setSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState<{ txHash: string } | null>(null)

  // Receive state
  const [receiveAddress, setReceiveAddress] = useState<string>("")
  const [receiveQrCode, setReceiveQrCode] = useState<string>("")
  const [loadingReceive, setLoadingReceive] = useState(false)

  // Transfer state
  const [transferToken, setTransferToken] = useState<string>("")
  const [transferAmount, setTransferAmount] = useState<string>("")
  const [transferFromAccount, setTransferFromAccount] = useState<string>("")
  const [transferToAccount, setTransferToAccount] = useState<string>("")
  const [transferring, setTransferring] = useState(false)
  const [transferSuccess, setTransferSuccess] = useState<{ txHash: string } | null>(null)

  // New wallet state
  const [newWalletName, setNewWalletName] = useState<string>("")
  const [creatingWallet, setCreatingWallet] = useState(false)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [tokensData, accountsData] = await Promise.all([walletService.getTokens(), walletService.getAccounts()])
        setTokens(tokensData)
        setAccounts(accountsData)

        // Set default values for dropdowns
        if (tokensData.length > 0) {
          setSwapFrom(tokensData[0].id)
          setSwapTo(tokensData.length > 1 ? tokensData[1].id : tokensData[0].id)
          setSendToken(tokensData[0].id)
          setTransferToken(tokensData[0].id)
        }

        if (accountsData.length > 0) {
          setTransferFromAccount(accountsData[0].id)
          setTransferToAccount(accountsData[0].id)
        }
      } catch (error) {
        console.error("Failed to load wallet data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Load receive address
  const loadReceiveAddress = async () => {
    setLoadingReceive(true)
    try {
      const data = await walletService.getReceiveAddress()
      setReceiveAddress(data.address)
      setReceiveQrCode(data.qrCode)
    } catch (error) {
      console.error("Failed to load receive address:", error)
    } finally {
      setLoadingReceive(false)
    }
  }

  // Handle swap tokens
  const handleSwapTokens = async () => {
    if (!swapFrom || !swapTo || !swapAmount) return

    setSwapping(true)
    setSwapSuccess(null)

    try {
      const params: SwapParams = {
        fromToken: swapFrom,
        toToken: swapTo,
        amount: Number.parseFloat(swapAmount),
        slippage: swapSlippage,
      }

      const result = await walletService.swapTokens(params)

      if (result.success) {
        setSwapSuccess(result)
        // Reset form
        setSwapAmount("")
      }
    } catch (error) {
      console.error("Failed to swap tokens:", error)
    } finally {
      setSwapping(false)
    }
  }

  // Handle send tokens
  const handleSendTokens = async () => {
    if (!sendToken || !sendAmount || !sendAddress) return

    setSending(true)
    setSendSuccess(null)

    try {
      const params: TransferParams = {
        token: sendToken,
        amount: Number.parseFloat(sendAmount),
        toAddress: sendAddress,
        memo: sendMemo,
      }

      const result = await walletService.sendTokens(params)

      if (result.success) {
        setSendSuccess(result)
        // Reset form
        setSendAmount("")
        setSendAddress("")
        setSendMemo("")
      }
    } catch (error) {
      console.error("Failed to send tokens:", error)
    } finally {
      setSending(false)
    }
  }

  // Handle transfer between accounts
  const handleTransferBetweenAccounts = async () => {
    if (!transferToken || !transferAmount || !transferFromAccount || !transferToAccount) return

    setTransferring(true)
    setTransferSuccess(null)

    try {
      const params = {
        token: transferToken,
        amount: Number.parseFloat(transferAmount),
        toAddress: accounts.find((a) => a.id === transferToAccount)?.address || "",
        fromAccount: transferFromAccount,
        toAccount: transferToAccount,
      }

      const result = await walletService.transferBetweenAccounts(params)

      if (result.success) {
        setTransferSuccess(result)
        // Reset form
        setTransferAmount("")
      }
    } catch (error) {
      console.error("Failed to transfer tokens:", error)
    } finally {
      setTransferring(false)
    }
  }

  // Handle create new wallet
  const handleCreateWallet = async () => {
    if (!newWalletName) return

    setCreatingWallet(true)

    try {
      const newWallet = await walletService.createWallet(newWalletName)
      setAccounts([...accounts, newWallet])
      setNewWalletName("")
    } catch (error) {
      console.error("Failed to create wallet:", error)
    } finally {
      setCreatingWallet(false)
    }
  }

  // Copy address to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Address copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy address:", err)
      })
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading wallet...</span>
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">My Wallet</CardTitle>
            <CardDescription>Manage your tokens and transactions</CardDescription>
          </div>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {accounts.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">{accounts[0].name}</h3>
              <Badge variant="outline">{accounts[0].address}</Badge>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Total Balance</span>
              <span className="text-2xl font-bold">{formatCurrency(accounts[0].balance)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button className="w-full" onClick={() => setActiveTab("swap")}>
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                Swap
              </Button>
              <Button className="w-full" onClick={() => setActiveTab("send")}>
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="swap">Swap</TabsTrigger>
            <TabsTrigger value="send">Send</TabsTrigger>
            <TabsTrigger value="receive" onClick={loadReceiveAddress}>
              Receive
            </TabsTrigger>
          </TabsList>

          {/* Tokens Tab */}
          <TabsContent value="tokens">
            <div className="space-y-4">
              {tokens.map((token) => (
                <div key={token.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={token.icon || "/placeholder.svg"} alt={token.name} />
                      <AvatarFallback>{token.symbol.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{token.name}</div>
                      <div className="text-sm text-muted-foreground">{token.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {token.balance} {token.symbol}
                    </div>
                    <div className="text-sm text-muted-foreground">{formatCurrency(token.value)}</div>
                  </div>
                </div>
              ))}

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Wallet
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Wallet</DialogTitle>
                    <DialogDescription>Create a new wallet to manage your tokens separately.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="wallet-name">Wallet Name</Label>
                      <Input
                        id="wallet-name"
                        placeholder="e.g., Savings Wallet"
                        value={newWalletName}
                        onChange={(e) => setNewWalletName(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateWallet} disabled={!newWalletName || creatingWallet}>
                      {creatingWallet && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Wallet
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>

          {/* Swap Tab */}
          <TabsContent value="swap">
            <div className="space-y-4">
              {swapSuccess && (
                <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Swap Successful!</AlertTitle>
                  <AlertDescription>Transaction Hash: {swapSuccess.txHash}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label>From</Label>
                <div className="flex space-x-2">
                  <Select value={swapFrom} onValueChange={setSwapFrom}>
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.id} value={token.id}>
                          <div className="flex items-center">
                            <Avatar className="h-5 w-5 mr-2">
                              <AvatarFallback>{token.symbol.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            {token.symbol}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="text-sm text-right text-muted-foreground">
                  Balance: {tokens.find((t) => t.id === swapFrom)?.balance || 0}{" "}
                  {tokens.find((t) => t.id === swapFrom)?.symbol}
                </div>
              </div>

              <div className="flex justify-center my-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const temp = swapFrom
                    setSwapFrom(swapTo)
                    setSwapTo(temp)
                  }}
                >
                  <ArrowLeftRight className="h-6 w-6" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>To</Label>
                <Select value={swapTo} onValueChange={setSwapTo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token.id} value={token.id}>
                        <div className="flex items-center">
                          <Avatar className="h-5 w-5 mr-2">
                            <AvatarFallback>{token.symbol.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          {token.symbol}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex justify-between">
                  <Label>Slippage Tolerance</Label>
                  <span>{swapSlippage}%</span>
                </div>
                <Slider
                  value={[swapSlippage]}
                  min={0.1}
                  max={5}
                  step={0.1}
                  onValueChange={(value) => setSwapSlippage(value[0])}
                />
              </div>

              <div className="pt-4">
                <Button
                  className="w-full"
                  onClick={handleSwapTokens}
                  disabled={!swapFrom || !swapTo || !swapAmount || swapping}
                >
                  {swapping ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Swapping...
                    </>
                  ) : (
                    <>
                      <ArrowLeftRight className="mr-2 h-4 w-4" />
                      Swap Tokens
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Send Tab */}
          <TabsContent value="send">
            <div className="space-y-4">
              {sendSuccess && (
                <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Transfer Successful!</AlertTitle>
                  <AlertDescription>Transaction Hash: {sendSuccess.txHash}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label>Token</Label>
                <Select value={sendToken} onValueChange={setSendToken}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token.id} value={token.id}>
                        <div className="flex items-center">
                          <Avatar className="h-5 w-5 mr-2">
                            <AvatarFallback>{token.symbol.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          {token.symbol}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-sm text-right text-muted-foreground">
                  Balance: {tokens.find((t) => t.id === sendToken)?.balance || 0}{" "}
                  {tokens.find((t) => t.id === sendToken)?.symbol}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Recipient Address</Label>
                <Input placeholder="0x..." value={sendAddress} onChange={(e) => setSendAddress(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Memo (Optional)</Label>
                <Input placeholder="What's this for?" value={sendMemo} onChange={(e) => setSendMemo(e.target.value)} />
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Transfer to another wallet</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Select Wallet
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Transfer Between Wallets</DialogTitle>
                        <DialogDescription>Move tokens between your wallets.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Token</Label>
                          <Select value={transferToken} onValueChange={setTransferToken}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                            <SelectContent>
                              {tokens.map((token) => (
                                <SelectItem key={token.id} value={token.id}>
                                  <div className="flex items-center">
                                    <Avatar className="h-5 w-5 mr-2">
                                      <AvatarFallback>{token.symbol.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    {token.symbol}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Amount</Label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>From Wallet</Label>
                          <Select value={transferFromAccount} onValueChange={setTransferFromAccount}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select wallet" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>To Wallet</Label>
                          <Select value={transferToAccount} onValueChange={setTransferToAccount}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select wallet" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handleTransferBetweenAccounts}
                          disabled={
                            !transferToken ||
                            !transferAmount ||
                            !transferFromAccount ||
                            !transferToAccount ||
                            transferring
                          }
                        >
                          {transferring ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Transferring...
                            </>
                          ) : (
                            "Transfer"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleSendTokens}
                disabled={!sendToken || !sendAmount || !sendAddress || sending}
              >
                {sending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Tokens
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Receive Tab */}
          <TabsContent value="receive">
            <div className="space-y-4">
              {loadingReceive ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading address...</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="p-2 border rounded-lg">
                      <img src={receiveQrCode || "/placeholder.svg"} alt="QR Code" className="w-48 h-48" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Your Wallet Address</Label>
                    <div className="flex">
                      <Input value={receiveAddress} readOnly className="flex-1" />
                      <Button
                        variant="outline"
                        size="icon"
                        className="ml-2"
                        onClick={() => copyToClipboard(receiveAddress)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Share this address to receive tokens from others.</p>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      Only send compatible tokens to this address. Sending incompatible tokens may result in permanent
                      loss.
                    </AlertDescription>
                  </Alert>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full space-y-2">
          <h3 className="font-medium">Recent Transactions</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg border">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <ArrowLeftRight className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Swap NALI to ETH</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />2 hours ago
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">-50 NALI</div>
                <div className="text-xs text-green-600">+0.001 ETH</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg border">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <Send className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Send USDC</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Yesterday
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">-25 USDC</div>
                <div className="text-xs text-muted-foreground">0x8a72...3f91</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg border">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-purple-100 mr-3">
                  <Coins className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Received NALI</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />3 days ago
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">+100 NALI</div>
                <div className="text-xs text-muted-foreground">Reward</div>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-2">
            View All Transactions
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
