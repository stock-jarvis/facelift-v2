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
		icon: <IoMdHome />,
	},
	{
		id: 'pricing-1',
		name: 'Pricing',
		icon: <MdOutlinePriceCheck />,
	},
	{
		id: 'contact-1',
		name: 'Contact',
		icon: <IoIosContacts />,
	},
	{
		id: 'team-1',
		name: 'Team',
		icon: <GiTeamDowngrade />,
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

export const pricingData = [
	{
		time: 1,
		day: 28,
		access: ['Multi exchange simulator', 'Algo basket'],
		basketCredit: 20,
		worth: 300,
		price: 999,
	},

	{
		time: 2,
		day: 56,
		access: ['Multi exchange simulator', 'Algo basket'],
		basketCredit: 40,
		worth: 600,
		price: 1999,
	},
	{
		time: 3,
		day: 84,
		access: ['Multi exchange simulator', 'Algo basket'],
		basketCredit: 60,
		worth: 900,
		price: 2999,
	},
]

export const privacyPolicy = {
	description: `This Privacy Policy (referred to as the "Privacy Policy" or "Policy") outlines how KWPS Technologies Private Limited (referred to as "KWPS Technologies," "We," "Us," "Our") handles personal information provided by You (referred to as "User," "You," "Your") when accessing or utilizing the services offered through the StockJarvis website (referred to as the "Website") and/or any services provided by KWPS Technologies (referred to as "Services"). By accessing or using the Website and/or Services, You consent to this Policy.Please be aware that access to the Website or Services is only granted upon reading, comprehending, and accepting the collection, storage, processing, usage, and sharing of personal information as outlined in this Policy. This Policy pertains solely to personal information collected on the Website and does not extend to information provided to KWPS Technologies through other avenues, such as social media or third-party websites. Kindly note that this Policy may be modified at the sole discretion of KWPS Technologies. Any alterations to the Privacy Policy will be communicated on the Website.`,
	terms: [
		{
			key: 'definitions',
			head: 'Definitions:',
			desc: `Applicable Laws" encompasses all laws and regulations with the force of law within India, as periodically enacted and enforced. "Controller" refers to the natural or legal entity that determines the objectives and methods of personal data processing. "Cookies" pertain to data pieces automatically stored on a User's hard drive when accessing the Website. "Device Information" refers to the information about a User's device collected during interactions with the Website. "Non-Personal Data" indicates information incapable of identifying the User. "Personal Data" encompasses any information that directly or indirectly identifies a User. "Processing" entails any action involving Personal Data, including but not limited to collection, recording, organization, storage, adaptation, alteration, retrieval, consultation, use, disclosure, combination, restriction, erasure, or destruction. "Processor" stands for the natural or legal entity processing Personal Data on behalf of the Controller. "Purpose" denotes the rationale behind Personal Data collection and processing. "Services" includes offerings provided by KWPS Technologies through the Website, such as back-testing, forward testing, live trading, etc. "Website" refers to the website operated by KWPS Technologies at https://www.stockjarvis.com.`,
		},

		{
			key: 'collections',
			head: 'Collection of Personal Data:',
			desc: `KWPS Technologies may collect various types of information resulting from Your interaction with the Website and/or Services, including but not limited to: Your complete name, address, location, phone number, and email address. Details pertaining to Your trading account, broker information, broker-generated API keys, etc. Information regarding Your Website usage, encompassing Device Information, Internet Protocol address, browser details, interactions with the Website, time spent on individual webpages, and similar data. Data related to Your activities concerning the Website and/or Services via tracking technologies, Cookies, or analogous methods.`,
		},

		{
			key: 'utilization',
			head: 'Utilization of Personal Data:',
			desc: `The information gathered during Your interaction with the Website and/or Services may be used for the following objectives: Analysis of Your use of the Website and/or Services. Identification of usage trends. Automated feedback collection to enhance the Website and/or Services. Monitoring Your Website and/or Services usage and personalizing them to align with Your needs. Providing assistance and resolving any technical issues or system malfunctions. Addressing technical failures or errors and extending support. Processing information and documents, including financial or other data provided by You, for text indexing, data structuring, extraction of insights, and improving Services. Development of novel products and Services. Supplying measurement, analytics, and business services wherein KWPS Technologies processes data as a Controller. This list is illustrative and not exhaustive. Personal Data and other information may be retained in line with Applicable Laws for purposes including but not limited to: Service provision. Compliance with Applicable Laws and other legal obligations. Resolution of disputes. Enforcement of rights from agreements with Users. Legislative requirements or orders from regulatory authorities affecting KWPS Technologies`,
		},

		{
			key: 'transfer',
			head: 'Transfer of Personal Data:',
			desc: `KWPS Technologies refrains from disclosing or transferring Your information to third parties without Your consent, unless: Mandated by Applicable Laws or court, tribunal, regulatory, or adjudicatory orders. Requested by Government agencies for identity verification, prevention, detection, investigation (including cyber incidents), prosecution, or punishment of offenses.`,
		},

		{
			key: 'cookie',
			head: 'Cookie Policy:',
			desc: `Similar to most websites, KWPS Technologies employs Cookies to gather information when accessing the Website. Similar technologies such as pixels and tags may also be used. Preferences set while using the Website or accessing Services ensure security, improve user interaction assessment, and facilitate Website enhancement.`,
		},

		{
			key: 'disclaimers',
			head: 'Disclaimers:',
			desc: `Necessary Cookies: Required to access the Website or Services. Functionality Cookies: Enhance Website interaction and personalize preferences. Performance Cookies: Evaluate Website interaction and improve features. You can control Cookie storage by adjusting settings in Your web browser, but disabling necessary Cookies may impede Website or Service usage. KWPS Technologies does not oversee third-party Cookies during Website or Service access, such as those on linked third-party websites.`,
		},

		{
			key: 'security',
			head: 'Security:',
			desc: `Should Personal Data or other information be disclosed or transferred to third-party partners, processing will adhere to Applicable Laws and this Privacy Policy's terms. KWPS Technologies reserves the right to retain Non-Personal Data, Device Information, and usage data as required. Website and Services may be situated and operated in jurisdictions beyond India. Usage and access to the Website implies Your consent to Personal Data transfer to such jurisdictions. KWPS Technologies holds the right to delete or destroy Personal Data or information provided by You if it violates this Privacy Policy's terms. While KWPS Technologies employs reasonable security measures to safeguard Personal Data, it does not guarantee data security during electronic transmission. KWPS Technologies disclaims liability for loss, damage, or breach of privacy resulting from Website and/or Services usage or third-party platform access linked to the Website.`,
		},
		{
			key: 'third-security',
			head: 'Third-Party Links:',
			desc: `The Website and Services may contain links to third-party content or websites. KWPS Technologies has no control over such third-party websites or the content therein. KWPS Technologies expressly disclaims liability for third-party websites or content. Reviewing the privacy policy of third-party websites before submitting information is Your responsibility.`,
		},
		{
			key: 'third-assignment',
			head: 'Assignment and Transfer:',
			desc: `KWPS Technologies retains the freedom to assign its rights and obligations under this Policy to affiliates or in connection with mergers, acquisitions, restructuring, asset sales, or legal mandates. Data may be transferred to affiliates, successor entities, or new owners.`,
		},
		{
			key: 'us-contact',
			head: 'Contact Us:',
			desc: `For inquiries about this Privacy Policy, please contact Us at: [info@stockjarvis.com]`,
		},
		{
			key: 'refund-cancellation',
			head: 'Cancellation/Refund Policy:',
			desc: `All payments are nonrefundable and nontransferable.`,
		},
	],
}

export const termsAndConditions = {
	description: `These Terms of Use (referred to as "Terms of Use" or "Terms") govern the access and use of the website, www.stockjarvis.com (referred to as "Website"), and any services provided through or on the Website (referred to as "Services"). These Terms establish a legally binding agreement between the user of the Website (referred to as "User" or "You") and KWPS Technologies Private Limited, a company registered under the Companies Act, 2013, with its registered address at Fourth, 405, Core, NIBM Road, Salunke Vihar Road, Kondhwa, Pune, Maharashtra, 411048 (referred to as "KWPS Technologies" or "Company"). If You do not agree with these Terms of Use, please refrain from accessing, viewing, or using the Website.`,
	terms: [
		{
			key: 'definitions',
			head: 'Definitions:',
			desc: `"Privacy Policy" refers to the privacy policy accessible on the Website. "Services" encompasses the various offerings provided by KWPS Technologies through the Website, which include but are not limited to backtesting, forward testing, live trading, etc., within the jurisdiction of India. "Trading Strategy" signifies a set of actions determining a pattern for present or future trading and/or investment based on chosen trading and/or investment selections through the user interface elements offered on the Website. "User(s)" refers to individuals who utilize the Website or any Services, whether registered on the Website or not.`,
		},

		{
			key: 'website-use',
			head: 'Website Use:',
			desc: `Your interaction with the Website and/or any Services, which involves accessing, viewing, browsing the Website, or any part thereof, and registering for and utilizing Services, constitutes your acceptance of both these Terms and the Privacy Policy available at https://stockjarvis.com/privacy_policy. By agreeing to these Terms and the Privacy Policy, You affirm that: You possess the legal capacity to enter into a contract, i.e., You are at least eighteen years of age, possess sound judgment, and are not legally barred from contracting due to any applicable laws. If You are using the Website and/or Services in a personal capacity, this clause applies to You. You possess proper authorization to enter into this agreement, if You are using the Website and/or Services on behalf of another individual or entity. You explicitly affirm that You possess the necessary legal authority and rights to use the Website, Services, and to upload/provide information, data, and materials during Website and Service usage. You recognize that KWPS Technologies reserves the right to modify these Terms at any time. Your continued use of the Website and/or Services after such modifications indicates your acceptance of the updated Terms`,
		},

		{
			key: 'services',
			head: 'Services Offered:',
			desc: `KWPS Technologies may provide the following services, among others, through the Website: Backtesting: Evaluating user-input strategies using historical market data to produce hypothetical and/or historical outcomes. Forward Testing: Supplying a real-time simulation environment for assessing strategy behavior. Live Trading: Executing orders on behalf of the User via the User's brokerage account held with their stockbroker, in an automated manner as per the chosen Trading Strategy.`,
		},

		{
			key: 'acknowledgement',
			head: 'You acknowledge that:',
			desc: `KWPS Technologies may impose a fixed monthly subscription fee for Services or other applicable charges for Service use. KWPS Technologies retains the right to modify its pricing structure without prior notice. The Terms of Use do not restrict KWPS Technologies's right to decide pricing for Services at any given point. KWPS Technologies may levy service fees or affiliate revenue shares from brokers and/or third-party entities connected to the Website and/or Services. KWPS Technologies reserves the authority to limit Service use or subject it to higher registration or subscription fees. Additionally, KWPS Technologies can unilaterally alter the pricing structure for Services rendered through the Website.`,
		},

		{
			key: 'disclaimers',
			head: 'Disclaimers:',
			desc: `Unless otherwise mandated by law or specified in the Terms of Use or Privacy Policy, the Website and Services are provided "AS IS." KWPS Technologies makes no claims about the suitability of any information provided through the Website and/or Services, including but not limited to content about stocks, trends, market analysis, Trading Strategies, backtesting, software, products, and features for any purpose. KWPS Technologies disclaims all warranties and conditions, whether implied or explicit, including but not limited to merchantability, fitness for a particular purpose, title, non-infringement, and availability, with regard to such information. You understand that neither KWPS Technologies nor StockJarvis are registered investment advisors or stockbrokers/dealers. Your use of the Website and/or Services is undertaken at your own risk. You comprehend that trading securities involves high risks, and past performance does not guarantee future returns. You are solely responsible for the accuracy and legality of any content, data, information, or materials generated through Service usage. You agree to take full responsibility for the consequences of all trading decisions made, including potential capital loss. None of the investment or trading recommendations made via your brokerage account linked to the Website should be construed as offers to buy/sell securities or investment advice. Seek guidance from qualified professionals before making any investment decisions. You understand that hypothetical or simulated performance results have inherent limitations and may not accurately reflect actual trading outcomes. KWPS Technologies and its Services disclaim any representation of guaranteed profits or losses based on strategies tested or generated. You bear sole responsibility for all executed Trading Strategies in your portfolio through the Website. KWPS Technologies is not liable for losses or damages resulting from trading or investment activities in your portfolio. You acknowledge that the information provided by KWPS Technologies offers a general overview of Services. While KWPS Technologies strives for accurate and updated information, it shall not be held accountable for omissions, errors, inaccuracies, or failures to update information on the Website. You are responsible for ensuring your brokerage account is appropriately configured for executing strategies through the Website. KWPS Technologies is not liable for transaction failures, fund deductions, misplaced orders, etc., due to brokerage account issues. You accept that KWPS Technologies is not responsible for orders executed through your trading account linked to the Website/Services. You must monitor your brokerage account to ensure transactions align with your Trading Strategy. KWPS Technologies disclaims warranties and liabilities for transaction accuracy or investments made via the Website/Services. You understand that maintaining the confidentiality of registration details, account information, brokerage details, and more is your responsibility. KWPS Technologies shall not be held liable for misuse of such information. You acknowledge the intricacies of backtesting, forward testing, and live trading via automated algorithms, which may entail technical glitches. KWPS Technologies, its directors, employees, agents, or any representatives shall not be held liable for any losses resulting from implementing your Trading Strategy, and no compensation shall be sought.`,
		},

		{
			key: 'prohibited-activities:',
			head: 'Prohibited Activities:',
			desc: `When accessing or using the Website/Services, You agree:
Not to use the Website/Services unlawfully or in unauthorized ways.
Not to misuse the Website/Services, including introducing viruses, trojans, or interfering with code or third-party systems.
Not to burden or harm the Website/Services servers, networks, or databases.
Not to create multiple fake user accounts or engage in fraudulent practices.
Not to copy, transmit, or share Website content without prior written permission.
Not to sell or lease Services/content without express written consent.
Not to profit from providing unauthorized access to the Website or content.
Not to upload, transmit, or publish content infringing third-party intellectual property rights.
Not to reverse engineer, modify, or distribute Services/source code.
Not to use the Website/Services for unauthorized marketing purposes.
Not to falsely claim affiliation`,
		},
	],
}

export const RefundPolicy = {
	description: `This Cancellation/Refund Policy (referred to as the "Policy") outlines the terms and conditions governing cancellations and refunds for services provided by KWPS Technologies Private Limited (referred to as "KWPS Technologies," "We," "Us," "Our") through the StockJarvis website (referred to as the "Website") and related services (referred to as "Services"). By accessing or utilizing the Services on the Website, You agree to adhere to this Policy.`,
	terms: [
		{
			key: 'cancellation-policy',
			head: 'Cancellation Policy:',
			desc: `All payments made for accessing and utilizing StockJarvis services are non-refundable, non-transferable, and non-cancellable. Once a payment has been processed, it cannot be reversed or refunded under any circumstances.`,
		},

		{
			key: 'refund-policy',
			head: 'Refund Policy:',
			desc: `KWPS Technologies does not offer refunds for any payments made for its Services. This includes but is not limited to subscription fees, usage fees, and any other fees associated with accessing and using the StockJarvis services.`,
		},

		{
			key: 'modifications-and-revisions',
			head: 'Modifications and Revisions:',
			desc: `KWPS Technologies reserves the right to modify or revise this Cancellation/Refund Policy at its sole discretion. Any changes will be updated on the Website, and continued usage of the Services implies acceptance of the modified Policy.`,
		},

		{
			key: 'acknowledgement',
			head: 'Contact Us:',
			desc: `If You have any questions or concerns about this Cancellation/Refund Policy, please contact Us at: [info@stockjarvis.com]
            Please note that this Policy is an integral part of the overall terms and conditions that govern the use of the StockJarvis services. By using the Services, You agree to comply with the terms set forth in this Policy.`,
		},
	],
}
