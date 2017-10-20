import ko from 'knockout'

export default class ResetOperationVM {
    constructor(resetHandler) {
        this.resetHandler = resetHandler
    }

    reset() {
        this.resetHandler()
    }
}