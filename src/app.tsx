import { Flex } from 'antd'
import Header from './common/components/header'
import Nav from '../src/components/Main/Navbar'
import { Outlet } from 'react-router-dom'
import '../src/components/styles/forgot.css'
import '../src/components/styles/gotologin.css'
import '../src/components/styles/signin.css'
import '../src/components/styles/signup.css'
import '../src/components/styles/verifypage.css'
import '../src/components/styles/Footer.css'
import '../src/components/styles/navbar.css'
import '../src/components/styles/main.css'

const App = () => {
	return (
		<Flex className="w-screen h-screen" vertical>
			{/* <Header /> */}
			{/* <Nav/> */}
			<Outlet />
		</Flex>
	)
}

export default App
