import { useLocation, useNavigate } from 'react-router-dom'
import { setAuthorizationHeader } from 'src/api/axios'
import { useAuthContext } from 'src/auth'

export const LOCAL_STORAGE_TOKEN_KEY = '__ST_INTERNAL_USE_ONLY__'

const useLoginManager = () => {
	const navigate = useNavigate()
	const { setAuth } = useAuthContext()
	const location = useLocation()

	const from = location.state?.from?.pathname ?? '/'

	const login = (token: string, remember?: boolean) => {
		setAuth({ token })
		setAuthorizationHeader(`Bearer ${token}`)
		if (remember) {
			localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
		}
		navigate(from)
	}

	const logout = () => {
		setAuth(null)
		setAuthorizationHeader(null)
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
	}

	return { login, logout } as const
}

export default useLoginManager
