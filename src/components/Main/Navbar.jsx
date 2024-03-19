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

const { Header } = Layout
const items = [
	{
		label: 'Dashboard',
		key: 'mail',
	},
	{
		label: 'Pricing',
		key: 'app',
	},
	{
		label: 'Features',
		key: 'SubMenu',
		children: [
			{
				type: 'group',
				//   label: 'Item 1',
				children: [
					{
						label: 'About',
						key: 'about',
					},
					{
						label: 'Contact Us',
						key: 'contact',
					},
				],
			},
		],
	},
	{
		label: 'Benefits',
		key: 'alipay',
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
					{/* <Menu className='menu' mode='horizontal'
                        items={[
                            {
                                label: "Dashboard",
                                key: "Dashboard"
                            },
                            {
                                label: "Pricing",
                                key: "Pricing"
                            },
                            {
                                label: "Features",
                                key: "subMenu",
                                Children:[
                                    {
                                        type: 'group',
                                        label: 'Item 1',
                                        children: [
                                          {
                                            label: 'Option 1',
                                            key: 'setting:1',
                                          },
                                          {
                                            label: 'Option 2',
                                            key: 'setting:2',
                                          },
                                        ],
                                      },
                                ]
                            },
                            {
                                label: "Benefits",
                                key: "Benefits"
                            },
                        ]}>
                    </Menu> */}
					<Button className="signbtn btntext" onClick={signin}>
						{' '}
						Sign In{' '}
					</Button>
					{/* <Typography.Text className='btntext' >Sign In</Typography.Text>< */}
				</Header>
			</Layout>
		</>
	)
}

export default Navbar
