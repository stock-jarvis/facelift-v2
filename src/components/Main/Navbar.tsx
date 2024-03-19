import React, { Children } from 'react'
import '../styles/navbar.css'
import logo from '../assets/icons/logo1.svg'
import { Button, Typography } from 'antd'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import { LOCAL_STORAGE } from 'src/common/local-storage-keys'

const { Header } = Layout
const items = [
	{
		label: 'Dashboard',
		key: 'dashboard',
	},
	{
		label: 'Pricing',
		key: 'pricing',
	},
	{
		label: 'Features',
		key: 'features',
		// children: [
		//   {
		//     type: 'group',
		//   //   label: 'Item 1',
		//     children: [
		//       {
		//         label: 'About',
		//         key: 'about',
		//       },
		//       {
		//         label: 'Contact Us',
		//         key: 'contact',
		//       },
		//     ],
		//   },

		// ],
	},
	{
		label: 'Benefits',
		key: 'benefits',
	},
]
const Navbar = () => {
	const navigate = useNavigate()

	const signin = () => {
		navigate('/login')
	}

	const [current, setCurrent] = useState('mail')
	const onClick = (e) => {
		console.log('click ', e)
		setCurrent(e.key)
	}
	const authTokenJSON = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE.SESSION_INFO)
	)

	return (
		<>
			<Layout>
				<Header className="header">
					<div className="logo">
						<img src={logo} alt="" />
						<Typography.Title
							level={1}
							style={{
								color: 'black',
							}}
						>
							StockJarvis
						</Typography.Title>
					</div>
					<Menu
						className="menu"
						onClick={onClick}
						selectedKeys={[current]}
						mode="horizontal"
						items={items}
					/>
					<Button className="signbtn btntext" onClick={signin}>
						{' '}
						Sign In{' '}
					</Button>
					{/* {authTokenJSON ? null : <Button className='signbtn btntext' onClick={signin}> Sign In </Button>} */}
				</Header>
			</Layout>
		</>
	)
}

export default Navbar
