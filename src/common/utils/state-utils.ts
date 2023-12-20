import { useReducer } from 'react'

export const useToggle = (initializerArg: boolean = false) =>
	useReducer((state) => !state, initializerArg)
