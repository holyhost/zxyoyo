
export function getPercentChange(v1: number, v2: number) {
    return parseFloat(((v2 - v1)/v1 * 100).toFixed(2)) 
}

export function isMainBoard(code: string){
    return code.startsWith('00') || code.startsWith('60')
}