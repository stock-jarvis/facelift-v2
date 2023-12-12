import { IoMdHome } from 'react-icons/io'
import { MdOutlinePriceCheck } from 'react-icons/md'
import { IoIosContacts } from 'react-icons/io'
import { GiTeamDowngrade } from 'react-icons/gi'
import { GoCodeOfConduct } from 'react-icons/go'
import { RiRefund2Fill } from 'react-icons/ri'
import { SiGnuprivacyguard } from 'react-icons/si'
import { FaInstagram } from 'react-icons/fa'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaTwitterSquare } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import HighChart from 'src/assets/images/highcharts.png'
import TradingView from 'src/assets/images/tradingview.png'
import GoogleCloud from 'src/assets/images/gcp.png'
export const guides = [
	{
		id: 'step-1',
		name: 'Step 1',
		value: 'Load any day and time in the past.',
	},
	{
		id: 'step-2',
		name: 'Step 2',
		value: 'Our simulator will load the data for that day of all instruments',
	},
	{
		id: 'step-3',
		name: 'Step 3',
		value: 'Add into the position the trade you want to take and backtest.',
	},
]

export const companyData = [
	{
		id: 'home-1',
		name: 'Home',
		icon: IoMdHome(),
	},
	{
		id: 'pricing-1',
		name: 'Pricing',
		icon: MdOutlinePriceCheck(),
	},
	{
		id: 'contact-1',
		name: 'Contact',
		icon: IoIosContacts(),
	},
	{
		id: 'team-1',
		name: 'Team',
		icon: GiTeamDowngrade(),
	},
]

export const companyTerms = [
	{
		id: 'privacy-1',
		name: 'Privacy Policy',
		icon: SiGnuprivacyguard(),
	},
	{
		id: 'terms-1',
		name: 'Terms & Conditions',
		icon: GoCodeOfConduct(),
	},
	{
		id: 'cancelation-1',
		name: 'Cancelation/Refund Policy',
		icon: RiRefund2Fill(),
	},
]

export const socialMedia = [
	{
		id: 'insta-1',
		name: 'Instagram',
		icon: FaInstagram(),
	},
	{
		id: 'meta-1',
		name: 'Facebook',
		icon: FaFacebookSquare(),
	},
	{
		id: 'twitter-1',
		name: 'Twitter',
		icon: FaTwitterSquare(),
	},
	{
		id: 'linkedin-1',
		name: 'LinkedIn',
		icon: FaLinkedin(),
	},
]

export const testinonialsData = [
	{
		id: 'test-1',
		testimonial:
			"Stockjarvis is a trader's dream. Detailed history for NSE, MCX,Currency is real. Backtesting's powerful, boosts my confidence. Deserves stars for smart trading.",
		name: 'Aarti',
		designation: 'Lead manager',
	},
	{
		id: 'test-2',
		testimonial:
			"Stockjarvis is mind-blowing! Secondwise data for NSE, MCX, Currency is gold. Backtesting's super accurate.Like a crystal ball for trading. 5 stars for sure!",
		name: 'Rupesh',
		designation: 'Product Manager',
	},
	{
		id: 'test-3',
		testimonial:
			"Secondwise data on NSE, MCX, Currency is gold.Backtesting's my secret to success.Invaluable insights. More than 5 stars!",
		name: 'Madhulika',
		designation: 'CTO',
	},
]

export const PartnersData = [
	{
		id: 'trading-1',
		data: 'TradingView is a charting platform for traders and investors, loved and visited by millions of users worldwide. It offers state-of-the-art charting tools and a space where people driven by markets can chat, chart, and prepare for trades. Among other things, it provides the essence of market research — data — and presents it in various forms: you can track important upcoming events in the Economic calendar or browse stocks in the screener to find the best opportunities for your portfolio. Whatever your trading strategy needs, just visit TradingView.',
		image: TradingView,
	},
	{
		id: 'googleCloud-1',
		data: 'Google Cloud is a leading cloud computing platform embraced by millions globally. With cutting-edge tools and a collaborative environment, it empowers businesses to innovate and streamline operations. From advanced analytics to scalable storage solutions, Google Cloud offers the core of digital transformation — data — delivered in diverse formats. Track pivotal market trends through AI-driven insights or optimize workflows with versatile APIs. Whatever your business demands, Google Cloud stands ready to drive growth and efficiency for your organization on a global scale.',
		image: GoogleCloud,
	},
	{
		id: 'highChart-1',
		data: `Highcharts stands as a premier data visualization platform, trusted by countless users worldwide. It furnishes dynamic and interactive charts that enhance understanding and decision-making. With versatile options and seamless integrations, Highcharts empowers developers to craft compelling data-driven narratives. Transform raw data into insightful visuals that resonate with your audience, whether it's for business reporting or data journalism. From line graphs to heatmaps, Highcharts encapsulates the essence of data representation, offering an array of tools to empower your storytelling and engage youraudience effectively.`,
		image: HighChart,
	},
]
