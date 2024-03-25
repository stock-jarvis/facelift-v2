import { Flex } from 'antd'
import { QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import '../src/components/styles/forgot.css'
import '../src/components/styles/gotologin.css'
import '../src/components/styles/signin.css'
import '../src/components/styles/signup.css'
import '../src/components/styles/verifypage.css'
import '../src/components/styles/Footer.css'
import '../src/components/styles/navbar.css'
import '../src/components/styles/main.css'
import { rootQueryClient } from './lib/queryClient'

const App = () => {
	return (
		<QueryClientProvider client={rootQueryClient}>
			<Flex className="w-screen h-screen" vertical>
				{/* <Header /> */}
				{/* <Nav/> */}
				<Outlet />
			</Flex>
		</QueryClientProvider>
	)
}

export default App
