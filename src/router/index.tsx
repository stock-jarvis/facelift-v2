import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import routes from './routes'
import { AuthContext } from 'src/auth'
import { useState } from 'react'
import { Auth } from 'src/auth/auth-context'
import { LOCAL_STORAGE_TOKEN_KEY } from 'src/auth/useLoginManager'

const router = createBrowserRouter(routes)

const Router = () => {
	const [auth, setAuth] = useState<Auth | null>(() => {
		const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
		if (token) {
			return { token }
		}
		return null
	})

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
			}}
		>
			<RouterProvider router={router} />
		</AuthContext.Provider>
	)
}

export default Router
