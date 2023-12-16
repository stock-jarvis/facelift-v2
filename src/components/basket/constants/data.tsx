import { OptionObject } from '../types/types'
import {
	DeleteOutlined,
	CopyOutlined,
	FormOutlined,
	ArrowRightOutlined,
	SnippetsOutlined,
} from '@ant-design/icons'

export const basketOptions: OptionObject[] = [
	{
		id: 1,
		value: 'spot',
		label: 'Spot',
	},
	{
		id: 2,
		value: 'future',
		label: 'Future',
	},
	{
		id: 3,
		value: 'options',
		label: 'Options',
	},
]
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

export const tradeTypeData = [
	{
		id: 1,
		label: 'ATM Pt',
		value: 'ATMPt',
		children: [
			{ id: 1, label: 'ATM', value: 'ATM' },
			{ id: 2, label: 'ATM 1 STRIKE', value: 'ATM 1 STRIKE' },
			{ id: 3, label: 'ATM 2 STRIKE', value: 'ATM 2 STRIKE' },
			{ id: 4, label: 'ATM 3 STRIKE', value: 'ATM 3 STRIKE' },
			{ id: 5, label: 'ATM 4 STRIKE', value: 'ATM 4 STRIKE' },
			{ id: 6, label: 'ATM 5 STRIKE', value: 'ATM 5 STRIKE' },
			{ id: 7, label: 'ATM 6 STRIKE', value: 'ATM 6 STRIKE' },
			{ id: 8, label: 'ATM 7 STRIKE', value: 'ATM 7 STRIKE' },
			{ id: 9, label: 'ATM 8 STRIKE', value: 'ATM 8 STRIKE' },
			{ id: 10, label: 'ATM 9 STRIKE', value: 'ATM 9 STRIKE' },
			{ id: 11, label: 'ATM 10 STRIKE', value: 'ATM 10 STRIKE' },
		],
	},
	{
		id: 2,
		label: 'ATM + - n%',
		value: 'ATMn',
		children: [
			{ id: 1, label: '+', value: '+' },
			{ id: 2, label: '-', value: '-' },
		],
	},
	{
		id: 3,
		label: 'CP of SP%',
		value: 'CPSP',
		children: [
			{ id: 1, label: '~', value: '~' },
			{ id: 2, label: '>=', value: '>=' },
			{ id: 3, label: '<=', value: '<=' },
		],
	},
	{
		id: 4,
		label: 'CP',
		value: 'CP',
		children: [
			{ id: 1, label: '~', value: '~' },
			{ id: 2, label: '>=', value: '>=' },
			{ id: 3, label: '<=', value: '<=' },
		],
	},
	{
		id: 5,
		label: 'Highest OI',
		value: 'HIGHOI',
		children: [
			{ id: 1, label: '1st highest OI', value: '1st highestOI' },
			{ id: 2, label: '2nd highest OI', value: '2nd highestOI' },
			{ id: 3, label: '3rd highest OI', value: '3rd highestOI' },
			{ id: 4, label: '4th highest OI', value: '5th highestOI' },
			{ id: 5, label: '5th highest OI', value: '6th highestOI' },
		],
	},
	{
		id: 6,
		label: 'CS of Spot %',
		value: 'CSSpot',
		children: [
			{ id: 1, label: '+', value: '+' },
			{ id: 2, label: '-', value: '-' },
		],
	},
	{
		id: 7,
		label: 'CP of Spot %',
		value: 'CPSpot',
		children: [
			{ id: 1, label: '+', value: '+' },
			{ id: 2, label: '-', value: '-' },
		],
	},
]
