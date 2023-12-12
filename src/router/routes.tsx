import { Suspense, lazy } from 'react'
import { RouteObject } from 'react-router-dom'
const HomePage = lazy(() => import('src/components/home/views/home-page'))
const Pricing = lazy(() => import('src/components/home/views/pricing'))
const Contact = lazy(() => import('src/components/home/views/contact'))
const Home = lazy(() => import('src/components/home'))
const Simulator = lazy(() => import('src/components/simulator'))

// TODO: Add loading spinners
const routes: RouteObject[] = [
	{
		path: '/',
		element: (
			<Suspense fallback={<div>Loader</div>}>
				<Home />
			</Suspense>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<div>Loader</div>}>
						<HomePage />
					</Suspense>
				),
			},
			{
				path: '/pricing',
				element: (
					<Suspense fallback={<div>Loader</div>}>
						<Pricing />
					</Suspense>
				),
			},
			{
				path: '/contact',
				element: (
					<Suspense fallback={<div>Loader</div>}>
						<Contact />
					</Suspense>
				),
			},
		],
	},
	{
		path: '/simulator',
		element: (
			<Suspense fallback={<div>Loader</div>}>
				<Simulator />
			</Suspense>
		),
	},
]

export default routes
