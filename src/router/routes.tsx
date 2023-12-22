// TODO: Fix up this file after merging

import { Spin } from 'antd'
import { Suspense, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

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
				path: '/',
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
		],
	},
]

export default routes
