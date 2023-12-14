import { ConfigProvider } from 'antd'
interface ThemProp {
	children: React.ReactNode
}
const Theme = ({ children }: ThemProp) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Input: {
						colorTextPlaceholder: '#D3D3D3',
						colorText: '#000000',
					},
					Select: {
						colorTextPlaceholder: '#D3D3D3',
						colorText: '#000000',
					},
					DatePicker: {
						colorText: '#2C9AFF',
						colorTextPlaceholder: '#2c9aff',
					},
					Button: {
						contentFontSizeLG: 30,
						defaultBg: '#2C9AFF',
						colorPrimaryBg: '#000000',
						primaryColor: '#000000',
						primaryShadow: '#000000',
						defaultBorderColor: '#2C9AFF',
						defaultColor: '#2C9AFF',
						colorPrimaryBgHover: '#B12EC1',
					},
					Modal: {
						colorTextHeading: '#000000',
						titleLineHeight: 3,
					},
				},
				token: {
					colorPrimary: '#2C9AFF',
					//colorD
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
