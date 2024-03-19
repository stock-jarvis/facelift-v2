import React from 'react'
import '../styles/gotologin.css'
import logo from '../assets/icons/logo1.svg'
import image8 from '../assets/images/image8.png'
import { Button, Card, Typography, Col, Flex, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
const Backtologin = () => {
	const navigate = useNavigate()
	const handleloginback = () => {
		navigate('/login')
	}
	return (
		<div className="maingotologin-div">
			<Row>
				<Col lg={14} xl={12}>
					<div className="div-form">
						<Flex>
							<img src={logo} alt="" />
							<Typography.Title level={1} className="logo-txt">
								{' '}
								StockJarvis{' '}
							</Typography.Title>
						</Flex>
						<div className="subcontent">
							<Typography.Text className="subtitle">
								{' '}
								Password changed successfully.
							</Typography.Text>
							<p className="subtext1">
								{' '}
								You changed your password successfully, now go back to the login
								page and try to login into your account using your new password.
							</p>
							<Button className="gologin" onClick={handleloginback}>
								{' '}
								Back To Login{' '}
							</Button>
						</div>
					</div>
				</Col>

				<Col lg={10} xl={12}>
					<div className="carddiv1">
						<Card className="image-card1">
							<img src={image8} className="image3" alt="" />
						</Card>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default Backtologin
