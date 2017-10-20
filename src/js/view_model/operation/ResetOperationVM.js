import ko from 'knockout'

export default class ResetOperationVM {
    resetHandler: () => void
    constructor(resetHandler: () => void) {
        this.resetHandler = resetHandler
    }

    reset() {
        this.resetHandler()
    }
}