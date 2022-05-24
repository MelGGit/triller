import { TweetController, UserController, UserStorage } from '@/types/contracts'
import { ethers, utils } from 'ethers'
import { defineStore, acceptHMRUpdate } from 'pinia'
import UserControllerAbi from '@/artifacts/UserController.json'
import UserStorageAbi from '@/artifacts/UserStorage.json'
import { ref, reactive } from 'vue'
import { LoggedInUserInformation, UserInformation } from '@/types/webAppTypes'

export const useWeb3Store = defineStore('web3', () => {
  /**
   * states
   */
  const account = ref('')
  const error = ref('')
  const isCorrectNetwork = ref(true)
  const isLoading = ref(false)
  const loggedInUserId = ref(0)
  const isLoggedIn = ref(false)
  const userProfile = reactive<LoggedInUserInformation>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bio: '',
    id: 0
  })

  async function connect(connect: boolean): Promise<void> {
    try {
      const { ethereum } = window
      if (!ethereum) {
        error.value = "Metamask not installed!"
        return
      }
      if (!(await checkIfIsAlreadyConnected()) && connect) await requestAccess()
      await getLoggedInUserId()
      await getUserInfo(loggedInUserId.value)
      await checkIsCorrectNetwork()
      await setupEventListeners()
    } catch {
      error.value = "Account request refused."
    }
  }
  async function getLoggedInUserId() {
    try {
      if (account.value === '') return

      const storage = await getUserStorageContract()
      const userId = await storage?.addresses(account.value)

      if (!userId) return
      loggedInUserId.value = userId.toNumber()
      return userId.toNumber()
    } catch (error) {
      console.log(error)
    }
  }

  async function getUserInfo(userId: number) {
    if(userId === 0) return
    const storage = await getUserStorageContract()
    const profileInfo = await storage?.profiles(userId)

    if(!profileInfo) return
    const { id, username, firstName, lastName, bio, eMail } = profileInfo

    if(id.toNumber() === 0 || !id.toNumber()) throw "Couldn't find user!"
    userProfile.username = utils.parseBytes32String(username),
    userProfile.firstName = utils.parseBytes32String(firstName)
    userProfile.lastName = utils.parseBytes32String(lastName)
    userProfile.bio = bio
    userProfile.email = eMail
    userProfile.id = id.toNumber()

    isLoggedIn.value = true
    return {
      id: id.toNumber(),
      username: utils.parseBytes32String(username),
      firstName: utils.parseBytes32String(firstName),
      lastName: utils.parseBytes32String(firstName),
      bio,
      email: eMail
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
  async function createUser(userInformation: UserInformation) {
    try {
      const controller = await getUserContract()
      const result = await controller?.createUser(
        userInformation.username,
        userInformation.firstName,
        userInformation.lastName,
        userInformation.bio,
        userInformation.email
      )
      return result
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async function getUserStorageContract(): Promise<UserStorage | null> {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const userStorageContract = new ethers.Contract(
        import.meta.env.VITE_USER_STORAGE,
        UserStorageAbi,
        signer
      ) as UserStorage
      return userStorageContract
    } catch {
      error.value = 'User Storage Contract not found'
      return null
    }
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

  return {
    connect,
    createUser,
    switchNetwork,
    account,
    isLoading,
    getLoggedInUserId,
    loggedInUserId,
    userProfile,
    isLoggedIn
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWeb3Store, import.meta.hot))