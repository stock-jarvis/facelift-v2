import { createContext, useContext } from 'react'

export const InstrumentsContext = createContext<{
	isError: boolean
	isLoading: boolean
	instruments: string[]
}>({
	isError: false,
	isLoading: true,
	instruments: [],
})

export const useInstrumentsContext = () => useContext(InstrumentsContext)
