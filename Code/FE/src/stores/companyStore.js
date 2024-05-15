import { action, observable } from 'mobx'
import { CompanyRequest } from '../requests/CompanyRequest'

class CompanyStore {
  /** Company list */
  @observable companyList = []
  @action getCompanyList = () => {
    return new Promise((resolve, reject) => {
      CompanyRequest.getCompanyList()
        .then(response => {
          this.companyList = response.data
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
  // Use for liên thông văn bản nội bộ
  @action getCompanyListV2 = () => {
    return new Promise((resolve, reject) => {
      CompanyRequest.getCompanyList()
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  /** User list of company */
  // TODO: Chờ Luyện update API.
  @observable leaderList = []
  @observable adminList = []
  @observable clericalList = []
  @observable userList = []
  @observable allUserList = []
  @action getUserListWithRole = (role_name, company_code) => {
    return new Promise((resolve, reject) => {
      CompanyRequest.getUserListWithRole(role_name, company_code)
        .then(response => {
          switch (role_name) {
            case 'ADMIN':
              this.adminList = response.data
              break
            case 'USER':
              this.userList = response.data
              break
            case 'CLERICAL':
              this.clericalList = response.data
              break
            case 'LEADER':
              this.leaderList = response.data
              break
            case '':
              this.allUserList = response.data
              break
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  /** Clear store */
  @action clearStore = () => {
    this.companyList.length = 0
  }
  @action clearAllUserList = () => {
    this.allUserList.length = 0
  }
}

export default new CompanyStore()
