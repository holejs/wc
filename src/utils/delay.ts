export const delayFn = (ms: number = 0): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))
