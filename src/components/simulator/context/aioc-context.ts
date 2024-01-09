import { createContext, useContext } from 'react'
import { AIOCResponse } from 'src/api/simulator/simulator'

export const AIOCContext = createContext<
	AIOCResponse & { isError: boolean; isLoading: boolean }
>({
	isError: false,
	isLoading: true,
	futures: {},
	expiryList: [],
	optionChain: {},
})

export const useAIOCContext = () => useContext(AIOCContext)
