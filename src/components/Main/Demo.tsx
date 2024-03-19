import { Swiper, SwiperSlide } from 'swiper/react'
import React, { useRef, useState, useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import './styles.css'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
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
import profile1 from '../assets/images/profile1.png'
import profile2 from '../assets/images/profile2.png'
import profile3 from '../assets/images/profile3.png'
const Demo = () => {
	const [activeIndex, setActiveIndex] = useState(0)

	// const handleSlideChange = (swiper) => {
	//     setActiveIndex(swiper.activeIndex);
	// };
	const swiperRef = useRef(null)

	useEffect(() => {
		const swiper = swiperRef.current.swiper
		swiper.on('slideChange', () => {
			// console.log('Slide changed to: ', swiper.realIndex);
			setActiveIndex(swiper.realIndex)
			// Apply extra CSS effects based on the active slide index (swiper.realIndex)
		})
	}, [])
	return (
		<>
			<Swiper
				// effect={'coverflow'}
				ref={swiperRef}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				// onSlideChange={handleSlideChange}
				// grabCursor={true}
				loop={true}
				centeredSlides={true}
				slidesPerView={'auto'}
				coverflowEffect={{
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				}}
				pagination={true}
				modules={[Autoplay, EffectCoverflow, Pagination]}
				className="mySwiper"
			>
				<SwiperSlide>
					<div className="card-maindiv">
						<img src={profile1} className="card-maindiv-img" alt="" />
						<Card
							className={activeIndex === 0 ? 'highlight-slide' : 'profilecard'}
						>
							<Flex vertical justify={'center'}>
								<div className="profilecard-div">
									<div>
										<p className="profilecard-name">Jane Cooper</p>
										<h1 className="profilecard-type">Seasoned Trader</h1>
									</div>
								</div>
							</Flex>
							<Typography.Text className="profilecard-text">
								Using the Real-Time Simulation feature has been a game-changer
								for me. The ability to experience market movements second by
								second is unmatched. It's not just a simulation; it's a
								real-time thrill that has significantly sharpened my trading
								instincts. This platform is a must for anyone serious about
								staying ahead in today's dynamic market.
							</Typography.Text>
						</Card>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="card-maindiv">
						<img src={profile2} className="card-maindiv-img" alt="" />
						<Card
							className={activeIndex === 1 ? 'highlight-slide' : 'profilecard'}
						>
							<div className="profilecard-div">
								<div>
									<p className="profilecard-name">Cameron Williamson</p>
									<h1 className="profilecard-type profilecard-margintype">
										Novice Investor
									</h1>
								</div>
							</div>
							<Typography.Text className="profilecard-text">
								As a beginner, the Real-Time Simulation provided a risk-free
								environment to learn and practice. The second-by-second
								unfolding of market dynamics helped me understand the nuances of
								trading in a way that textbooks couldn't. It's like a virtual
								trading classroom where mistakes don't cost real money. Highly
								recommended for those starting their trading journey!
							</Typography.Text>
						</Card>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="card-maindiv">
						<img src={profile3} className="card-maindiv-img" alt="" />
						<Card
							className={activeIndex === 2 ? 'highlight-slide' : 'profilecard'}
						>
							<div className="profilecard-div">
								<div>
									<p className="profilecard-name">Leslie Alexander</p>
									<h1 className="profilecard-type">Financial Analyst</h1>
								</div>
							</div>
							<Typography.Text className="profilecard-text">
								The integration of all Indian exchanges for market analysis sets
								this platform apart. Real-Time Simulation, coupled with
								comprehensive analytics across exchanges, gives invaluable
								insights for decision-making. The ultra-fast order execution
								through cloud infrastructure adds an extra layer of efficiency.
								It's an all-in-one solution for traders and analysts alike.
							</Typography.Text>
						</Card>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="card-maindiv">
						<img src={profile1} className="card-maindiv-img" alt="" />
						<Card
							className={activeIndex === 3 ? 'highlight-slide' : 'profilecard'}
						>
							<Flex vertical justify={'center'}>
								<div className="profilecard-div">
									<div>
										<p className="profilecard-name">Jane Cooper</p>
										<h1 className="profilecard-type">Seasoned Trader</h1>
									</div>
								</div>
							</Flex>
							<Typography.Text className="profilecard-text">
								Using the Real-Time Simulation feature has been a game-changer
								for me. The ability to experience market movements second by
								second is unmatched. It's not just a simulation; it's a
								real-time thrill that has significantly sharpened my trading
								instincts. This platform is a must for anyone serious about
								staying ahead in today's dynamic market.
							</Typography.Text>
						</Card>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="card-maindiv">
						<img src={profile3} className="card-maindiv-img" alt="" />
						<Card
							className={activeIndex === 4 ? 'highlight-slide' : 'profilecard'}
						>
							<div className="profilecard-div">
								<div>
									<p className="profilecard-name">Leslie Alexander</p>
									<h1 className="profilecard-type">Financial Analyst</h1>
								</div>
							</div>
							<Typography.Text className="profilecard-text">
								The integration of all Indian exchanges for market analysis sets
								this platform apart. Real-Time Simulation, coupled with
								comprehensive analytics across exchanges, gives invaluable
								insights for decision-making. The ultra-fast order execution
								through cloud infrastructure adds an extra layer of efficiency.
								It's an all-in-one solution for traders and analysts alike.
							</Typography.Text>
						</Card>
					</div>
				</SwiperSlide>
			</Swiper>
		</>
	)
}

export default Demo
