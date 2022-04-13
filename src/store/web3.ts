import { TweetController, UserController } from '@/types/contracts'
import { ethers } from 'ethers'
import { defineStore, acceptHMRUpdate } from 'pinia'
import UserControllerAbi from '@/artifacts/UserController.json'
import { ref } from 'vue'

export const useWeb3Store = defineStore('web3', () => {
  /**
   * states
   */
  const account = ref('')
  const error = ref('')
  const isCorrectNetwork = ref(true)
  const isLoading = ref(false)

  async function connect(connect: boolean): Promise<void> {
    try {
      const { ethereum } = window
      if (!ethereum) {
        error.value = "Metamask not installed!"
        return
      }
      if (!(await checkIfIsAlreadyConnected()) && connect) await requestAccess()
      await checkIsCorrectNetwork()
      await setupEventListeners()
    } catch {
      error.value = "Account request refused."
    }
  }

  async function checkIfIsAlreadyConnected(): Promise<boolean> {
    const { ethereum } = window
    const accounts: string[] = await ethereum.request({ method: 'eth_accounts' })
    if (accounts.length !== 0) {
      account.value = accounts[0]
      return true
    } else {
      return false
    }
  }

  async function requestAccess(): Promise<void> {
    const { ethereum } = window
    const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' })
    account.value = accounts[0]
  }

  async function checkIsCorrectNetwork(): Promise<void> {
    const { ethereum } = window
    const chainId = await ethereum.request({ method: 'eth_chainId' })
    const appChainId = import.meta.env.VITE_APP_CHAIN_ID
    if (chainId !== appChainId) {
      isCorrectNetwork.value = false
    }
  }

  async function switchNetwork(): Promise<boolean> {
    const { ethereum } = window
    try {
      await ethereum.requesr({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: import.meta.env.VITE_APP_CHAIN_ID }]
      })
      isCorrectNetwork.value = true
      return true
    } catch {
      return false
    }
  }

  async function setupEventListeners(): Promise<void> {
    const { ethereum } = window
    ethereum.on('accountsChanged', async () => {
      history.replaceState(null, '', '/')
      window.location.reload()
    })
    ethereum.on('chainChanged', async () => {
      await checkIsCorrectNetwork()
    })
  }
  async function getUserContract(): Promise<UserController | null> {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const userControllerContract = new ethers.Contract(
        import.meta.env.VITE_USER_CONTROLLER,
        UserControllerAbi,
        signer
      ) as UserController
      return userControllerContract
    } catch {
      error.value = 'User Contract not found'
      return null
    }
  }
  async function getTweetContract(): Promise<TweetController | null> {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const tweetControllerContract = new ethers.Contract(
        import.meta.env.VITE_USER_CONTROLLER,
        UserControllerAbi,
        signer
      ) as TweetController
      return tweetControllerContract
    } catch {
      error.value = 'Tweet Contract not found'
      return null
    }
  }

  return {}
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWeb3Store, import.meta.hot))