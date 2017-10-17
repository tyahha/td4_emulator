export default class RomLineAddress {
    constructor(address) {
        this.value = address
        this.display = `00${address}`.slice(-2)
    }
}