import { createContext, useContext } from 'react'

export type Auth = {
	token?: string
}

type AuthContextType = {
	auth: Auth | null
	setAuth: React.Dispatch<React.SetStateAction<Auth | null>>
}

export const AuthContext = createContext<AuthContextType>({
	auth: {},
	setAuth: () => {},
})

export const useAuthContext = () => useContext(AuthContext)
