/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_TWEET_STORAGE: string,
  readonly VITE_USER_STORAGE: string,
  readonly VITE_CONTRACT_MANAGER: string,
  readonly VITE_TWEET_CONTROLLER: string,
  readonly VITE_USER_CONTROLLER: string,
  readonly VITE_APP_CHAIN_ID: string,
  readonly VITE_APP_NETWORK_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}