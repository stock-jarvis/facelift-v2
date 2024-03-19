// TODO: Fix up this file after merging

import { Spin } from 'antd'
import { Suspense, lazy } from 'react'
import { RouteObject } from 'react-router-dom'
// import Resetpassword from 'src/components/auth/Resetpassword'
// import Forgetpage from 'src/components/auth/Forgetpage'
// import Signin from 'src/components/auth/Signin'
// import SignupPage from 'src/components/auth/SignupPage'
// import Landing from 'src/components/Main/Landing'
// import Hero1 from '../components/Main/Hero1';
const App = lazy(() => import('src/app'))

const HomePage = lazy(() => import('src/components/home/views/home-page'))
const Pricing = lazy(() => import('src/components/home/views/pricing'))
const Contact = lazy(() => import('src/components/home/views/contact'))
const Privacy = lazy(() => import('src/components/home/views/privacy'))
const Terms = lazy(() => import('src/components/home/views/terms-conditions'))
const RefundPolicy = lazy(
	() => import('src/components/home/views/refund-policy')
)
// const Home = lazy(() => import('src/components/home'))
const Simulator = lazy(() => import('src/components/simulator'))
const Basket = lazy(() => import('src/components/basket'))
// const Hero1 = lazy(() => import('src/components/Main/Hero1'))
const Landing = lazy(() => import('src/components/Main/Landing'))
const SignupPage = lazy(() => import('src/components/auth/SignupPage'))
const Signin = lazy(() => import('src/components/auth/Signin'))
const Forgetpage = lazy(() => import('src/components/auth/Forgetpage'))
const Resetpassword = lazy(() => import('src/components/auth/Resetpassword'))

const FullscreenSpinner = () => <Spin fullscreen />

const routes: RouteObject[] = [
	{
		path: '/',
		element: (
			<Suspense fallback={<FullscreenSpinner />}>
				<App />
			</Suspense>
		),
		children: [
			{
				path: '/home',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<HomePage />
					</Suspense>
				),
			},
			{
				path: '/pricing',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<Pricing />
					</Suspense>
				),
			},
			{
				path: '/contact',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<Contact />
					</Suspense>
				),
			},
			{
				path: '/privacy-policy',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<Privacy />
					</Suspense>
				),
			},
			{
				path: '/terms',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<Terms />
					</Suspense>
				),
			},
			{
				path: '/refund-policy',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<RefundPolicy />
					</Suspense>
				),
			},
			{
				path: '/simulator',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<Simulator />
					</Suspense>
				),
			},
			{
				path: '/basket',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<Basket />
					</Suspense>
				),
			},
			{
				path: '/',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<Landing />
					</Suspense>
				),
			},
			{
				path: '/signup',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<SignupPage />
					</Suspense>
				),
			},
			{
				path: '/login',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<Signin />
					</Suspense>
				),
			},
			{
				path: '/forget',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<Forgetpage />
					</Suspense>
				),
			},
			{
				path: '/resetpassword',
				element: (
					<Suspense fallback={<FullscreenSpinner />}>
						<Resetpassword />
					</Suspense>
				),
			},
		],
	},
]

export default routes
