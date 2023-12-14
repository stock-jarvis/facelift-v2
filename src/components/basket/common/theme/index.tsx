import { ConfigProvider } from 'antd'
interface ThemProp {
	children: React.ReactNode
}
const Theme = ({ children }: ThemProp) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#2C9AFF',
					colorTextHeading: '#ffffff',
					colorBorder: '#000000',
					padding: 10,
					colorPrimaryBorder: '#ffffff',
				},
			}}
		>
			{children}
		</ConfigProvider>
	)
}
export default Theme
