import { Flex } from 'antd'
import Header from './common/components/header'
import { Outlet } from 'react-router-dom'

const App = () => {
	return (
		<Flex className="w-screen h-screen" vertical>
			<Header />
			<Outlet />
		</Flex>
	)
}

export default App
