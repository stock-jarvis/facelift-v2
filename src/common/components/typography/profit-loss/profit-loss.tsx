import { Typography } from 'antd'

type ProfitLossProps = {
	value: number
}

const ProfitLoss: React.FC<ProfitLossProps> = ({ value }) => (
	<Typography.Text
		type={value > 0 ? 'success' : value < 0 ? 'danger' : 'secondary'}
	>
		{value}
	</Typography.Text>
)

export default ProfitLoss
