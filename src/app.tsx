import { Flex } from 'antd'
import Header from './common/components/header'
import { Outlet } from 'react-router-dom'
// import useLoginManager from './auth/useLoginManager'
// import { useEffect } from 'react'
// import { invalidateToken } from './api/axios/axios'

const App = () => {
	// const { logout } = useLoginManager()

	// useEffect(() => {
	// 	invalidateToken(() => {
	// 		logout()
	// 	})
	// }, [logout])

	return (
		<Flex className="w-screen h-screen" vertical>
			<Header />
			<Outlet />
		</Flex>
	)
}

export default App
