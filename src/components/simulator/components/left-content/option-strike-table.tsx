import { Table, TableProps as AntdTableProps } from 'antd'
import { range } from 'radash'
import { useMemo } from 'react'

const mockData = [...range(0, 2000, (i) => i, 100)].map((value) => ({
	id: value,
	call: 100 + value,
	iv1: '',
	strike: 38000 + value,
	iv2: '',
	put: 900 - value,
}))

type OptionStrikeTableData = {
	call: number
	iv1: string
	strike: number
	iv2: string
	put: number
}

type TableProps = AntdTableProps<OptionStrikeTableData>

const OptionStrikeTable = () => {
	const dataSource: TableProps['dataSource'] = useMemo(() => mockData, [])

	const columns: TableProps['columns'] = [
		{
			key: 'call',
			title: 'CALL',
			dataIndex: 'call',
			width: 24,
			align: 'center',
		},
		{
			key: 'iv1',
			title: 'IV',
			dataIndex: 'iv1',
			width: 12,
			align: 'center',
		},
		{
			key: 'strike',
			title: 'Strike',
			dataIndex: 'strike',
			width: 26,
			align: 'center',
		},
		{
			key: 'iv2',
			title: 'IV',
			dataIndex: 'iv2',
			width: 12,
			align: 'center',
		},
		{
			key: 'put',
			title: 'PUT',
			dataIndex: 'put',
			width: 24,
			align: 'center',
		},
	]

	return (
		<div className="flex h-full">
			<Table
				// TODO: Enable virtual after fixing height
				// virtual
				dataSource={dataSource}
				columns={columns}
				pagination={false}
				scroll={{
					// TODO: Fix responsive height
					y: '60vh',
				}}
			/>
		</div>
	)
}

export default OptionStrikeTable
