import { action, observable } from 'mobx'
import { AccountRequest } from '../requests/AccountRequest'

class AccountStore {
  @observable accountTruc = null

  /** Account list */
  @observable accountList = []

  @action updateAccountById = (accountId, accountInfo) => {
    return new Promise((resolve, reject) => {
      AccountRequest.updateAccountById(accountId, accountInfo)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
  @action deleteAccountById = accountId => {
    return new Promise((resolve, reject) => {
      AccountRequest.deleteAccountById(accountId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
  @action createAccount = accountInfo => {
    return new Promise((resolve, reject) => {
      AccountRequest.createAccount(accountInfo)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
  @action getCurrentUserAccount = () => {
    return new Promise((resolve, reject) => {
      AccountRequest.getCurrentUserAccount()
        .then(response => {
          this.accountList = response.data
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  @action setActiveAccount = accountId => {
    return new Promise((resolve, reject) => {
      AccountRequest.switchAccount(accountId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  /** Clear store */
  @action clearStore = () => {
    this.accountList.length = 0
    this.accountTruc = null
  }
}

export default new AccountStore()
