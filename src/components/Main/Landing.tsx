import React from 'react'
import '../styles/Footer.css'
import '../styles/main.css'
import { Button, Form, Input, message } from 'antd'
import { FaArrowUp } from 'react-icons/fa'
import {
	Card,
	Flex,
	Typography,
	Row,
	Col,
	Layout,
	Carousel,
	Select,
	Space,
} from 'antd'
import {
	ArrowRightOutlined,
	HeatMapOutlined,
	UserAddOutlined,
	PhoneOutlined,
	MailOutlined,
	UserOutlined,
	FacebookFilled,
	InstagramFilled,
	LinkedinFilled,
} from '@ant-design/icons'
// import arrowright from '../assets/icons/arrowright.svg';
// import logo from '../assets/icons/logo1.svg';
import imgd1 from '../assets/icons/img_thumbsup.svg'
import imgd3 from '../assets/icons/img_group.svg'
import imgd2 from '../assets/icons/img_close.svg'
import imgd4 from '../assets/icons/img_laptop1.png'
import bg1 from '../assets/images/bg1.png'
import bg2 from '../assets/images/bg2.png'
import bg3 from '../assets/images/bg3.png'
import bg4 from '../assets/images/bg4.png'
import realtime1 from '../assets/icons/realtime1.png'
import realtime2 from '../assets/icons/realtime2.png'
import realtime3 from '../assets/icons/realtime3.png'
import realtime4 from '../assets/icons/realtime4.png'
import realtime5 from '../assets/icons/realtime5.png'
import realtime6 from '../assets/icons/realtime6.png'
import step1 from '../assets/images/step1.png'
import step2 from '../assets/images/step2.png'
import step3 from '../assets/images/step3.png'
import purple from '../assets/icons/purple.svg'
import orange from '../assets/icons/orange.svg'
import blue from '../assets/icons/blue.svg'
import signup from '../assets/images/signup.png'
// import profile1 from '../assets/images/profile1.png';
// import profile2 from '../assets/images/profile2.png';
// import profile3 from '../assets/images/profile3.png';
// import GoToTop from '../components/GoToTop';
import Demo from './Demo'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { FloatButton } from 'antd'
import { useState } from 'react'
import { MdArrowOutward } from 'react-icons/md'
const { Option } = Select
const { Content, Footer } = Layout

const Landing = () => {
	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select
				style={{
					width: '70px',
					height: '65px',
				}}
				defaultValue="+91 Ind"
			>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		</Form.Item>
	)
	const [form] = Form.useForm()
	const [messageApi, contextHolder] = message.useMessage()
	const key = 'updatable'
	const handlefeedback = (values) => {
		console.log('User Feedback details', values)
		messageApi.open({
			key,
			type: 'loading',
			content: 'Loading...',
		})
		setTimeout(() => {
			messageApi.open({
				key,
				type: 'success',
				content: 'Your Feedback sent',
				duration: 2,
			})
		}, 1000)

		form.resetFields()
	}
	const handlecreateaccount = () => {
		navigate('/signuppage')
	}
	const navigate = useNavigate()

	return (
		<>
			<div>
				<Navbar />
				<div className="maindiv1">
					<div className="parentdiv1">
						<div className="childdiv1">
							<Typography.Title className="title1" level={1}>
								Elevate your trading with you india's top
								<span className="title1-span"> stock market platform</span>
							</Typography.Title>
							<Typography.Text className="text">
								"introducing the first-second wise stock market simulator,
								comprehensive integration, and ultra-fast order execution-all in
								one place!"
							</Typography.Text>
							<Button className="button-hero">
								Get Started For Free <ArrowRightOutlined />
							</Button>
						</div>
					</div>
					<div className="parentdiv2">
						<Card
							className="card1"
							hoverable
							cover={<img alt="example" src={bg1} className="card1-image" />}
						>
							<Card className="child-card">
								<Flex>
									<img src={imgd4} alt="" className="child-card-img" />
									<p className="child-card-txt">
										Revolutionize Your <br /> Trading Experience
									</p>
								</Flex>
							</Card>
						</Card>
					</div>
				</div>
				{/* Second Part */}
				<div className="maindiv2">
					<Flex className="flexdiv">
						<div className="maindiv2-child">
							<h1>
								<HeatMapOutlined />
								Logoipsum.
							</h1>
						</div>
						<div className="maindiv2-child">
							<h1>
								<HeatMapOutlined />
								Logoipsum.
							</h1>
						</div>
						<div className="maindiv2-child">
							<h1>
								<HeatMapOutlined />
								Logoipsum.
							</h1>
						</div>
						<div className="maindiv2-child">
							<h1>
								<HeatMapOutlined />
								Logoipsum.
							</h1>
						</div>
						<div className="maindiv2-child">
							<h1>
								<HeatMapOutlined />
								Logoipsum.
							</h1>
						</div>
					</Flex>
				</div>
				{/* third part */}

				<div className="maindiv3">
					<div>
						<p className="maindiv3-child-title1">Key Features</p>
						<h1 className="maindiv3-child-title2">
							Why <span className="maindiv3-child-span">Choose</span> Our
							Platform?
						</h1>
					</div>
				</div>
				{/* four Part */}
				{/* Second Part Create */}
				<div className="maindiv4">
					<Row gutter={[48, 8]} className="row1">
						<Col span={14}>
							<Card hoverable className="row1-card">
								<img alt="example" className="row1-card-image" src={bg2} />
							</Card>
							<Card className="row1-childcard1" hoverable>
								<Flex>
									<img src={realtime1} className="row1-childcard1-img" alt="" />
									<Typography.Text className="row1-childcard1-text">
										Real-time trading
									</Typography.Text>
								</Flex>
							</Card>
							<Card className="row1-childcard2" hoverable>
								<Flex>
									<img src={realtime2} className="row1-childcard2-img" alt="" />
									<Typography.Text className="row1-childcard2-text">
										Groundbreaking simulator
									</Typography.Text>
								</Flex>
							</Card>
						</Col>
						<Col span={10} className="row1-col2">
							<div className="row1-col2-parentdiv">
								<Typography.Title className="row1-col2-title">
									First Second Wise{' '}
									<span className="row1-col2-span">Simulation.</span>
								</Typography.Title>
								<Typography.Text className="row1-col2-text">
									Immerse yourself in real-time trading with our groundbreaking
									simulator, providing unparalleled precision and
									responsiveness.
								</Typography.Text>
							</div>
							<div>
								<img src={imgd1} alt="" />
							</div>
						</Col>
					</Row>

					<Row gutter={[48, 8]} className="row2">
						<Col span={10} className="row2-col1">
							<div className="row2-col1-div1">
								<Typography.Title className="row2-col1-div1-title">
									All-Exchange{' '}
									<span style={{ color: '#A3AAB6' }}>Integration.</span>
								</Typography.Title>
								<Typography.Text className="row2-col1-div1-text">
									Access a holistic view of the market with our platform, the
									first to integrate all major exchanges in India for in-depth
									market analysis.
								</Typography.Text>
							</div>
							<div className="row2-col1-div2">
								<img src={imgd3} alt="" />
							</div>
						</Col>
						<Col span={14} className="row2-col2">
							<Card
								hoverable
								className="row2-col2-card"
								cover={
									<img
										alt="example"
										src={bg4}
										className="row2-col2-cardimage"
									/>
								}
							></Card>
							<Card hoverable className="row2-col2-childcard1">
								<Flex>
									<img
										src={realtime3}
										className="row2-col2-childcard1-img"
										alt=""
									/>
									<Typography.Text className="row2-col2-childcard1-text">
										In-Depth market analysis
									</Typography.Text>
								</Flex>
							</Card>
							<Card hoverable className="row2-col2-childcard2">
								<Flex>
									<img
										src={realtime4}
										className="row2-col2-childcard2-img"
										alt=""
									/>
									<Typography.Text className="row2-col2-childcard2-text">
										integrate all major exchanges
									</Typography.Text>
								</Flex>
							</Card>
						</Col>
					</Row>
					<Row gutter={[48, 8]} className="row3">
						<Col span={14} className="row3-col1">
							<Card hoverable className="row3-col1-card">
								<img alt="example" className="row3-col1-card-image" src={bg3} />
							</Card>
							<Card hoverable className="row3-col1-childcard1">
								<Flex>
									<img
										src={realtime5}
										className="row3-col1-childcard1-img"
										alt=""
									/>
									<Typography.Text className="row3-col1-childcard1-text">
										lightning - fast order execution
									</Typography.Text>
								</Flex>
							</Card>
							<Card hoverable className="row3-col1-childcard2">
								<Flex>
									<img
										src={realtime6}
										className="row3-col1-childcard2-img"
										alt=""
									/>
									<Typography.Text className="row3-col1-childcard2-text">
										Fully Cloud Based Infrastructure
									</Typography.Text>
								</Flex>
							</Card>
						</Col>
						<Col span={10} className="row3-col2">
							<div className="row3-col2-div1">
								<Typography.Title className="row3-col2-div1-title">
									Cloud-Powered
									<span className="row3-col2-div1-span"> Speed.</span>
								</Typography.Title>
								<Typography.Text className="row3-col2-div1-text">
									Experience lightning-fast order execution thanks to our fully
									cloud-based infrastructure, ensuring you stay ahead in the
									fast-paced world of trading.
								</Typography.Text>
							</div>
							<div>
								<img src={imgd2} alt="" />
							</div>
						</Col>
					</Row>
				</div>
				{/* *********************************************************************************************************************** */}
				{/* Five Part */}
				<div className="maindiv5">
					<div style={{ justifyContent: 'center', display: 'flex' }}>
						<div>
							<p className="maindiv5-parentdiv1-text">How It Works</p>
							<h1 className="maindiv5-parentdiv1-title">
								Seamless Trading in Three Simple Steps
							</h1>
						</div>
					</div>
					{/* Steps-Card */}
					<div className="maindiv5-parentdiv2">
						<Flex>
							<Card hoverable className="maindiv5-parentdiv2-card">
								<Flex vertical>
									<Typography.Text className="maindiv5-parentdiv2-card-text">
										Step-1
									</Typography.Text>
									{/* <Button type='primary'>Step-1</Button> */}
									<h2>Sign Up</h2>
									<p>
										Create your account and unlock the power of the first-second
										wise stock market simulator, integrated market analysis, and
										ultra-fast order execution.
									</p>
									<div className="maindiv5-parentdiv2-card1-div1">
										<img
											alt="example"
											src={step1}
											className="maindiv5-parentdiv2-card1-div1img"
										/>
									</div>
								</Flex>
							</Card>
							<Card hoverable className="maindiv5-parentdiv2-card">
								<Flex vertical>
									<Typography.Text className="maindiv5-parentdiv2-card-text">
										Step-2
									</Typography.Text>
									<h2>Explore Market</h2>
									<p>
										Navigate seamlessly through all exchanges, analyze market
										trends, and make informed decisions with our intuitive
										platform.
									</p>
									<div className="maindiv5-parentdiv2-card2-div1">
										<img
											alt="example"
											src={step2}
											className="maindiv5-parentdiv2-card2-div1img"
										/>
									</div>
								</Flex>
							</Card>
							{/*  */}
							<Card hoverable className="maindiv5-parentdiv2-card">
								<Flex vertical>
									<Typography.Text className="maindiv5-parentdiv2-card-text">
										Step-3
									</Typography.Text>
									<h2>Trade with confidence</h2>
									<p>
										Execute orders at unprecedented speeds, giving you the edge
										in the market. Test strategies risk-free with our advanced
										simulator.
									</p>
									<div className="maindiv5-parentdiv2-card3-div1">
										<img
											alt="example"
											src={step3}
											className="maindiv5-parentdiv2-card3-div1img"
										/>
									</div>
								</Flex>
							</Card>
						</Flex>
					</div>
				</div>
				{/* </div> */}
				{/* six part */}
				<Content className="box">
					<div className="maindiv6">
						<Row gutter={[48, 8]}>
							<Col span={12}>
								<div className="maindiv6-col1-div1">
									<Typography.Text className="maindiv6-col1-div1-text">
										Benefits
									</Typography.Text>
									<Typography.Title className="maindiv6-col1-div1-title">
										Empowering Your Trading Journey.
									</Typography.Title>
								</div>
							</Col>
							<Col span={12}>
								<div className="maindiv6-col2-div1">
									<Button className="maindiv6-col2-div1-btn">
										Start Your Journey Today
									</Button>
								</div>
							</Col>
						</Row>
					</div>
				</Content>
				<div className="maincolordiv">
					<Row>
						<Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
							<Card className="colorcard1">
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										height: '70px',
									}}
								>
									<div className="colorcard1-div1-cilddiv1">
										<img
											src={purple}
											className="colorcard1-div1-cilddiv1-img"
											alt=""
										/>
									</div>
									<div className="colorcard1-div1-cilddiv2">
										<p className="colorcard1-div1-cilddiv2-text">1</p>
									</div>
								</div>
								<Typography.Title className="colorcard1-title">
									Precision Trading
								</Typography.Title>
								<Typography.Text className="colorcard1-text">
									Execute trades with second-by-second precision, refining your
									strategies in a risk-free environment.
								</Typography.Text>
							</Card>
						</Col>
						<Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
							<Card className="colorcard2">
								<div className="colorcard2-div1">
									<div className="colorcar2-div1-cilddiv1">
										<img
											src={orange}
											className="colorcard2-div1-cilddiv1-img"
											alt=""
										/>
									</div>
									<div className="colorcard2-div1-cilddiv2">
										<p className="colorcard2-div1-cilddiv2-text">2</p>
									</div>
								</div>
								<Typography.Title className="colorcard2-title">
									Comprehensive Insights
								</Typography.Title>
								<Typography.Text className="colorcard2-text">
									Access market insights derived from integrated data across all
									exchanges, enhancing your decision-making process.
								</Typography.Text>
							</Card>
						</Col>
						<Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
							<Card className="colorcard3">
								<div className="colorcard3-div1">
									<div className="colorcar3-div1-cilddiv1">
										<img
											src={blue}
											className="colorcar3-div1-cilddiv1-img"
											alt=""
										/>
									</div>
									<div className="colorcard3-div1-cilddiv2">
										<p className="colorcard3-div1-cilddiv2-text">3</p>
									</div>
								</div>
								<Typography.Title className="colorcard3-title">
									Ultra-Fast Transactions
								</Typography.Title>
								<Typography.Text className="colorcard3-text">
									Trade confidently with our cloud-based infrastructure,
									ensuring your orders are executed at unmatched speeds.
								</Typography.Text>
							</Card>
						</Col>
					</Row>
				</div>
				{/* stage-7 create your account */}
				<div className="maindiv7">
					<Card className="maindiv7-datacard1">
						<Typography.Title className="maindiv7-datacard1-title">
							Ready To Transform Your{' '}
							<span className="maindiv7-datacard1-span">
								Trading Experience?
							</span>
						</Typography.Title>
						<Typography.Title className="maindiv7-datacard1-text">
							Sign up now and experience the synergy of real-time simulation,
							exchange integration, and cloud-powered speed.
						</Typography.Title>
						<Button
							className="maindiv7-datacard1-btn"
							onClick={handlecreateaccount}
						>
							Create Your Account <UserAddOutlined />
						</Button>
					</Card>

					<Card className="maindiv7-datacard2">
						<img className="maindiv7-datacard2-img" src={signup} alt="" />
					</Card>
				</div>
				{/* stage 8 */}
				{/* ********** Profile Card ********************************************************************************** */}
				<div className="maindiv8">
					<div>
						<p className="maindiv8-text">Testimonials</p>
						<h1 className="maindiv8-title">
							What Our <span className="maindiv8-span">Users </span>Say{' '}
						</h1>
					</div>
				</div>
				{/* stage 9********************************************************************** */}
				<div className="maindiv9">
					{/* <Carousel autoplay >
                    <div className='slidediv'>
                        <Flex justify={'center'}>
                            <div className='card-maindiv'>
                                <img src={profile1} className='card-maindiv-img' alt="" />
                                <Card className='profilecard'>
                                    <Flex vertical justify={'center'}>

                                        <div className='profilecard-div'>
                                            <div>
                                                <p className='profilecard-name'>Jane Cooper</p>
                                                <h1 className='profilecard-type'>Seasoned Trader</h1>
                                            </div>
                                        </div>
                                    </Flex>
                                    <Typography.Text className='profilecard-text'>
                                        Using the Real-Time Simulation feature has been a game-changer for me. The ability to experience market movements second by second is unmatched. It's not just a simulation; it's a real-time thrill that has significantly sharpened my trading instincts. This platform is a must for anyone serious about staying ahead in today's dynamic market.
                                    </Typography.Text>
                                </Card>
                            </div>

                            <div className='card-maindiv'>
                                <img src={profile2} className='card-maindiv-img' alt="" />
                                <Card className='profilecard cardmargin'>

                                    <div className='profilecard-div'>
                                        <div>
                                            <p className='profilecard-name'>Cameron Williamson</p>
                                            <h1 className='profilecard-type profilecard-margintype'>Novice Investor</h1>
                                        </div>
                                    </div>
                                    <Typography.Text className='profilecard-text'>
                                        As a beginner, the Real-Time Simulation provided a risk-free environment to learn and practice. The second-by-second unfolding of market dynamics helped me understand the nuances of trading in a way that textbooks couldn't. It's like a virtual trading classroom where mistakes don't cost real money. Highly recommended for those starting their trading journey!
                                    </Typography.Text>
                                </Card>
                            </div>
                            <div className='card-maindiv'>
                                <img src={profile3} className='card-maindiv-img' alt="" />
                                <Card className='profilecard cardmargin'>

                                    <div className='profilecard-div'>
                                        <div>
                                            <p className='profilecard-name'>Leslie Alexander</p>
                                            <h1 className='profilecard-type'>Financial Analyst</h1>
                                        </div>
                                    </div>
                                    <Typography.Text className='profilecard-text'>
                                        The integration of all Indian exchanges for market analysis sets this platform apart. Real-Time Simulation, coupled with comprehensive analytics across exchanges, gives invaluable insights for decision-making. The ultra-fast order execution through cloud infrastructure adds an extra layer of efficiency. It's an all-in-one solution for traders and analysts alike.
                                    </Typography.Text>
                                </Card>
                            </div>
                        </Flex>
                    </div>

                    <div className='slidediv'>
                        <Flex justify={'center'}>
                            <div className='card-maindiv'>
                                <img src={profile3} className='card-maindiv-img' alt="" />
                                <Card className='profilecard '>

                                    <div className='profilecard-div'>
                                        <div>
                                            <p className='profilecard-name'>Leslie Alexander</p>
                                            <h1 className='profilecard-type'>Financial Analyst</h1>
                                        </div>
                                    </div>
                                    <Typography.Text className='profilecard-text'>
                                        The integration of all Indian exchanges for market analysis sets this platform apart. Real-Time Simulation, coupled with comprehensive analytics across exchanges, gives invaluable insights for decision-making. The ultra-fast order execution through cloud infrastructure adds an extra layer of efficiency. It's an all-in-one solution for traders and analysts alike.
                                    </Typography.Text>
                                </Card>
                            </div>
                            <div className='card-maindiv'>
                                <img src={profile1} className='card-maindiv-img' alt="" />
                                <Card className='profilecard cardmargin'>

                                    <div className='profilecard-div'>
                                        <div>
                                            <p className='profilecard-name'>Jane Cooper</p>
                                            <h1 className='profilecard-type'>Seasoned Trader</h1>
                                        </div>
                                    </div>
                                    <Typography.Text className='profilecard-text'>
                                        Using the Real-Time Simulation feature has been a game-changer for me. The ability to experience market movements second by second is unmatched. It's not just a simulation; it's a real-time thrill that has significantly sharpened my trading instincts. This platform is a must for anyone serious about staying ahead in today's dynamic market.
                                    </Typography.Text>
                                </Card>
                            </div>
                        </Flex>
                    </div>
                </Carousel> */}

					<Demo />
				</div>
				{/* ******************************************************************************************** */}
				<div className="maindiv10">
					<div className="mainparentdiv">
						<Flex>
							<div className="part1div">
								<Typography.Title className="part1div-title">
									Have Questions? We're Here to Help.
								</Typography.Title>
								<Typography.Title className="part1div-title2">
									Contact Info :
								</Typography.Title>

								<Typography.Title className="part1div-text">
									<PhoneOutlined className="part1div-icon" /> +91 999 999 9999
								</Typography.Title>
								<Typography.Title className="part1div-text">
									<MailOutlined className="part1div-icon" />{' '}
									contact@finactive.trading
								</Typography.Title>
								<Typography.Title className="part1div-text">
									<PhoneOutlined className="part1div-icon" /> 123 Market St.
									#22B Charlottesville, California 44635
								</Typography.Title>
							</div>

							<Card className="part2card">
								<Form
									layout="vertical"
									onFinish={handlefeedback}
									variant="filled"
								>
									<Form.Item
										name="fname"
										label="Full Name"
										className="part2card-formlabel"
										rules={[
											{
												required: true,
												message: 'Please input your full name!',
											},
										]}
									>
										<Input
											size="large"
											prefix={<UserOutlined />}
											className="part2card-forminput"
											placeholder="Enter Full Name"
										/>
									</Form.Item>
									<Form.Item
										name="email"
										label="Email Address"
										className="part2card-formlabel"
										rules={[
											{
												required: true,
												message: 'Enter email id',
											},
										]}
									>
										<Input
											size="large"
											prefix={<MailOutlined />}
											className="part2card-forminput"
											placeholder="Enter Email Address"
										/>
									</Form.Item>

									<Form.Item
										name="phone"
										label="Phone Number"
										rules={[
											{
												required: true,
												message: 'Please input your phone number!',
											},
										]}
									>
										<Input
											size="large"
											className="inputfield-number"
											addonBefore={prefixSelector}
										/>
									</Form.Item>
									<Form.Item
										name="message"
										rules={[
											{
												required: true,
												message: 'Please enter feedback',
											},
										]}
									>
										<Input.TextArea
											placeholder="Message"
											size="large"
											className="part2card-formmessage"
										/>
									</Form.Item>
									<Form.Item>
										{/* contextholder is use for message box when user feedback form submited then show the message */}
										{contextHolder}
										<Button className="part2card-formbtn" htmlType="submit">
											Submit
										</Button>
									</Form.Item>
								</Form>
							</Card>
						</Flex>
					</div>
				</div>

				{/* Footer************************************************************************************Footer✔ */}
				<Footer className="footer">
					<div className="maindiv">
						<Flex justify={'space-around'}>
							{/* <img src={logo} alt="" /> */}
							<Typography.Title className="logo1">StockJarvis</Typography.Title>
							<div>
								<Typography.Title className="address">
									123 Market St. #22B Charlottesville, California 44635
								</Typography.Title>
								<div className="addresstop">
									<Typography.Title className="content2">
										(434) 546-4356
									</Typography.Title>
									<Typography.Title className="content2">
										contact@stockjarvis.trading
									</Typography.Title>
								</div>
							</div>
							<div className="divlink">
								<li clasName="links">About</li>
								<li clasName="links">Blog</li>
								<li clasName="links">FAQs</li>
								<li clasName="links">Contact Us</li>

								<Typography.Title className="content2">
									© 2024 Stockjarvis. All rights reserved.
								</Typography.Title>
							</div>
							<div className="divlink">
								<li clasName="links">
									<FacebookFilled /> Facebook
								</li>
								<li clasName="links">
									<LinkedinFilled /> Twiter
								</li>
								<li clasName="links">
									<LinkedinFilled /> Linkedin
								</li>
								<li clasName="links">
									<InstagramFilled /> Instragram
								</li>
							</div>
							{/* <GoToTop /> */}
						</Flex>
					</div>
				</Footer>
				<FloatButton.BackTop
					icon={<FaArrowUp size={'large'} />}
					style={{ height: '82px', width: '82px', backgroundColor: '#00CCFF' }}
				/>
			</div>
		</>
	)
}

export default Landing
