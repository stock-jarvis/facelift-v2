/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly SYSTEM_TRADE_BASE_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
