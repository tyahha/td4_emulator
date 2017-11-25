export default class RomLineAddress {
    value: number
    display: string
    constructor(address: number) {
        this.value = address
        this.display = `00${address}`.slice(-2)
    }
}