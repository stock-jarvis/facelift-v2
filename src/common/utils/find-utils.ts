import { min } from 'radash'

export const findClosest = (list: number[], target: number) =>
	min(list, (num) => Math.abs(num - target))
