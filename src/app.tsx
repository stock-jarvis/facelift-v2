import { Flex } from 'antd'
import Header from './common/components/header'
import { Outlet } from 'react-router-dom'
// import useLoginManager from './auth/useLoginManager'
// import { useEffect } from 'react'
// import { invalidateToken } from './api/axios/axios'

const App = () => {
	// const { logout } = useLoginManager()

	// Dev
	/** Registering the response interceptor that logs out the user with an invalid token */
	// useEffect(() => {
	// 	invalidateToken(() => {
	// 		logout()
	// 	})
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	return (
		<Flex className="w-screen h-screen" vertical>
			<Header />
			<Outlet />
		</Flex>
	)
}

export default App
