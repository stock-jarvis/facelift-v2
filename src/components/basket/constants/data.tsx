import {
	DeleteOutlined,
	CopyOutlined,
	FormOutlined,
	ArrowRightOutlined,
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
		key: 'save',
		icon: <SnippetsOutlined />,
		toolTipLabel: 'Save basket',
	},
	{
		key: 'delete',
		icon: <DeleteOutlined />,
		toolTipLabel: 'Delete basket',
	},
]

export const savedIconsSections = [
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
		key: 'delete',
		icon: <DeleteOutlined />,
		toolTipLabel: 'Delete basket',
	},
	{
		key: 'move',
		icon: <ArrowRightOutlined />,
		toolTipLabel: 'Move to runtime',
	},
]
