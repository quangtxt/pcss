import { action, autorun, observable } from 'mobx'

class LoadingAnimationStore {
  constructor() {
    autorun(() => {
      this.isVisible = this.loadingQueue.length !== 0
    })
  }

  /** Loading queue */
  @observable loadingQueue = []

  /** Loading spinner state */
  @observable isVisible = false
  @action showSpinner = state => {
    state ? this.loadingQueue.push(1) : this.loadingQueue.pop()
  }

  /** Table loading **/
  @observable tableLoading = false

  @action setTableLoading = state => {
    this.tableLoading = state
  }

  /** Clear data */
  @action clearStore = () => {
    this.tableLoading = false
    this.isVisible = false
    this.loadingQueue.length = 0
  }

  @observable showSpinInline = false

  @action setShowSpinInline = state => {
    this.showSpinInline = state
  }
}

export default new LoadingAnimationStore()
