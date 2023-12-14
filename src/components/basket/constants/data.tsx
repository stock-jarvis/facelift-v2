import {
	DeleteOutlined,
	CopyOutlined,
	FormOutlined,
	SnippetsOutlined,
} from '@ant-design/icons'

export const exchangeType = [
	{ type: 'NSE', id: 1 },
	{ type: 'MCX', id: 2 },
	{ type: 'CUR', id: 3 },
]

export const iconsSections = [
	{
		key: 'edit',
		icon: <FormOutlined />,
		toolTipLabel: 'Edit Basket',
	},
	{
		key: 'duplicate',
		icon: <CopyOutlined />,
		toolTipLabel: 'Make duplicate',
	},
	{
		key: 'duplicate',
		icon: <SnippetsOutlined />,
		toolTipLabel: 'Save basket',
	},
	{
		key: 'delete',
		icon: <DeleteOutlined />,
		toolTipLabel: 'Delete basket',
	},
]
