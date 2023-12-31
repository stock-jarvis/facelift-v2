import {
	Button as AntdButton,
	ButtonProps as AntdButtonProps,
	ConfigProvider,
	theme as antdTheme,
} from 'antd'
import { useMemo } from 'react'

type CustomButtonType = 'primary-bordered' | 'text-bordered'

export type ButtonProps = Omit<AntdButtonProps, 'type'> & {
	type?: AntdButtonProps['type'] | CustomButtonType
}

const ButtonTypeMapping: Partial<
	Record<NonNullable<ButtonProps['type']>, AntdButtonProps['type']>
> = {
	'primary-bordered': 'default',
	'text-bordered': 'text',
}

const Button: React.FC<ButtonProps> = (props) => {
	const { token } = antdTheme.useToken()

	const { children, type, ...rest } = props

	const theme = useMemo(() => {
		if (type === 'primary-bordered' || type === 'text-bordered') {
			return {
				components: {
					Button: {
						defaultBorderColor: token.colorPrimaryText,
						colorText: token.colorPrimaryText,
						colorInfoBorderHover: token.colorPrimaryHover,
					},
				},
			}
		}

		return {}
	}, [token, type])

	return (
		<ConfigProvider theme={theme}>
			<AntdButton
				{...rest}
				type={
					type
						? ButtonTypeMapping[type as CustomButtonType] ??
							(type as AntdButtonProps['type'])
						: undefined
				}
			>
				{children}
			</AntdButton>
		</ConfigProvider>
	)
}

export default Button
