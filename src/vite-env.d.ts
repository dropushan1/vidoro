/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_POSTHOG_KEY: string
    readonly VITE_POSTHOG_HOST: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  