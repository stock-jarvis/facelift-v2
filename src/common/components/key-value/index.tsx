import { Space, Typography } from 'antd'
import { TextProps } from 'antd/es/typography/Text'

const { Text } = Typography

type TitleValueProps = {
	title: string
	titleProps?: TextProps
	value: string
	valueProps?: TextProps
}

const TitleValue: React.FC<TitleValueProps> = (props) => (
	<Space>
		<Text strong {...(props.titleProps && {})}>
			{props.title} :
		</Text>
		<Text {...(props.valueProps ?? {})}>{props.value}</Text>
	</Space>
)

export default TitleValue
