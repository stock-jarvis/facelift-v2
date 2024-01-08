import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from 'src/auth'

type ProtectedRouteProps = {
	children: React.ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { auth } = useAuthContext()
	const location = useLocation()

	if (auth) {
		return children
	}

	return <Navigate to="/login" state={{ from: location }} replace />
}

export default ProtectedRoute
