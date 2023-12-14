import { ConfigProvider } from 'antd'
interface ThemProp {
	children: React.ReactNode
}
const Theme = ({ children }: ThemProp) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					DatePicker: {
						colorText: '#2C9AFF',
						colorTextPlaceholder: '#2c9aff',
					},
					Button: {
						contentFontSizeLG: 30,
						//defaultBg: '#2C9AFF',
						//colorPrimary: '#2C9AFF',
						//paddingBlock: 80,
					},
				},
				token: {
					colorPrimary: '#2C9AFF',
					colorTextBase: '#2C9AFF',
					colorBorderBg: '#2C9AFF',
					colorTextDisabled: '#ffffff',
					colorTextHeading: '#ffffff',
					colorBorder: '#000000',
					padding: 10,
					colorPrimaryBorder: '#ffffff',
					colorBorderSecondary: '#2C9AFF',
					paddingLG: 10,
					fontSize: 18,
					//siz,
				},
			}}
		>
			{children}
		</ConfigProvider>
	)
}
export default Theme
