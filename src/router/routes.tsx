import { Suspense, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

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
