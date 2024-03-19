import React from 'react'
import '../styles/gotologin.css'
import logo from '../assets/icons/logo1.svg'
import image3 from '../assets/images/image3.png'
import { Button, Card, Typography, Col, Flex, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
const Gotologin = () => {
	const navigate = useNavigate()
	const onsignin = () => {
		navigate('/login')
	}
	return (
		<>
			<div className="maingotologin-div">
				<Row>
					<Col lg={14} xl={12}>
						<div className="div-form">
							<Flex>
								<img src={logo} alt="" />
								<Typography.Title level={1} className="logo-txt">
									StockJarvis
								</Typography.Title>
							</Flex>
							<div className="subcontent">
								<Typography.Text className="subtitle">
									You have successfully verified <br /> your mobile number.
								</Typography.Text>
								<p className="subtext1">
									Congratulations! Your mobile number has been successfully
									verified.
								</p>
								<Button className="gologin" onClick={onsignin}>
									Go To Login
								</Button>
							</div>
						</div>
					</Col>

					<Col lg={10} xl={12}>
						<div className="carddiv1">
							<Card className="image-card1">
								<img src={image3} className="image3" alt="" />
							</Card>
						</div>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default Gotologin
