import { action, observable, toJS } from 'mobx'
import { UserRequest } from '../requests/UserRequest'
import { message } from 'antd'
import utils from '../utils'

class UserStore {
  /** Get users list */
  @observable userList = []
  @observable mentionUserList = []
  @observable userHasAdminList = []
  @observable userListTotalCount = 0
  @observable userListPageIndex = 0
  @observable userListPageSize = 10
  @observable userListKeyword = undefined
  @observable userListStatus = undefined
  @observable userListDepartmentCode = undefined
  @observable userListPositionCode = undefined
  @observable userListSortDirection = undefined
  @observable userListSortBy = undefined
  @observable userListHasAdmin = undefined
  @observable userListSortByDepartment =
    'departmentCode,desc,HDQT,BDH,BTCNS,BTCKT,BTKTH,BKTKTNB,BVTB,BCB%26DVHH,BTTKH,BPC%26QTRR,BTGTT,VPCQTCT,BCNTT,CDTCT'
  @observable companyCode = null
  @observable selectGroupData = []
  @observable groupList = []
  @action setSelectGroupData = payloadSelect => {
    this.selectGroupData = payloadSelect
  }
  @action clearSelectGroupData = () => {
    this.selectGroupData = []
  }

  @action getUserList = () => {
    return new Promise((resolve, reject) => {
      UserRequest.getUserList(
        this.userListPageSize,
        this.userListPageIndex,
        this.userListKeyword,
        this.userListDepartmentCode,
        this.userListStatus,
        this.userListSortDirection,
        this.userListSortBy,
        this.userListHasAdmin,
        this.userListSortByDepartment,
        this.companyCode,
        this.userListPositionCode
      )
        .then(response => {
          this.userListTotalCount = response.data.total_count
          this.userList = response.data.data
          this.userHasAdminList = response.data.data
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @action getMentionUserList = has_admin => {
    return new Promise((resolve, reject) => {
      UserRequest.getMentionUserList(has_admin)
        .then(response => {
          this.mentionUserList = response.data.userDetails.map(user => {
            return {
              id: user.userCode,
              display: utils.getNameInCapitalize(user.fullName),
              username: user.user_name,
              image: user.image,
            }
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @action getAllUsers = () => {
    return UserRequest.getMentionUserList(true)
  }

  @action setFilter = (filterName, filterValue) => {
    if (typeof filterName !== 'string') return
    this[filterName] = filterValue
  }

  @observable userOfDepartmentListTotalCount = 0
  @observable userOfDepartmentListPageIndex = 0
  @observable userOfDepartmentListPageSize = 10
  @observable userOfDepartmentListByDepartmentCode = undefined

  @action getUserListByDepartment = department_name => {
    return new Promise((resolve, reject) => {
      UserRequest.getUserList(
        this.userOfDepartmentListPageSize,
        this.userOfDepartmentListPageIndex,
        '',
        this.userOfDepartmentListByDepartmentCode,
        true,
        undefined,
        undefined,
        null,
        null,
        this.companyCode
      )
        .then(response => {
          this.userOfDepartmentListTotalCount = response.data.total_count
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @observable userOfPositionListTotalCount = 0
  @observable userOfPositionListPageIndex = 0
  @observable userOfPositionListPageSize = 10
  @observable userOfPositionListByPositionCode = undefined

  @action getUserListByPosition = () => {
    return new Promise((resolve, reject) => {
      UserRequest.getUserList(
        this.userOfPositionListPageSize,
        this.userOfPositionListPageIndex,
        '',
        undefined,
        undefined,
        undefined,
        undefined,
        null,
        null,
        this.companyCode,
        this.userOfPositionListByPositionCode
      )
        .then(response => {
          this.userOfPositionListTotalCount = response.data.total_count
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @action changeUserListKeyword = keyword => {
    this.userListPageIndex = 0
    this.userListKeyword = keyword && keyword.trim()
  }
  @action changeUserListSortBy = type => {
    this.userListPageIndex = 0
    this.userListSortBy = type
  }
  @action changeUserListSortDirection = direction => {
    this.userListPageIndex = 0
    this.userListSortDirection = direction
  }
  @action changeUserListStatus = status => {
    this.userListPageIndex = 0
    this.userListStatus = status
  }
  @action changeUserListDepartment = code => {
    this.userListPageIndex = 0
    this.userListDepartmentCode = code
  }
  @action changeUserListPageIndex = pageIndex => {
    this.userListPageIndex = pageIndex
  }
  @action changeUserListPageSize = pageSize => {
    this.userListPageSize = pageSize
  }
  @action clearUserListFilter = () => {
    this.userListStatus = undefined
    this.userListSortDirection = undefined
    this.userListSortBy = undefined
    this.userListDepartmentCode = undefined
  }

  /** Selected user */
  @observable selectedUser = {}
  @action setSelectedUser = userInfo => {
    // console.log('setSelectedUser', toJS(userInfo))
    this.selectedUser = userInfo
  }
  @action updateSelectedUser = (key, val) => {
    this.selectedUser[key] = val
  }
  @action clearSelectedUser = () => {
    this.selectedUser = {}
  }

  /** Update user */
  @action updateUser = userInfoObj => {
    const { code } = this.selectedUser
    return new Promise((resolve, reject) => {
      UserRequest.updateUser(code, userInfoObj)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  /** Update user roles */
  @action updateUserRoles = (userCode, rolesArr) => {
    return new Promise((resolve, reject) => {
      UserRequest.updateUserRole(userCode, rolesArr)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  /** Update user commands */
  @action updateUserCommands = (userCode, userCommandsArr) => {
    return new Promise((resolve, reject) => {
      UserRequest.updateUserCommands(userCode, userCommandsArr)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  /** Update user status */
  @action updateUserStatus = (userCode, toggleStatus) => {
    return new Promise((resolve, reject) => {
      UserRequest.updateUserStatus(userCode, toggleStatus)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  /** Create user */
  @action createUser = userInfo => {
    return new Promise((resolve, reject) => {
      UserRequest.createUser(userInfo)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          message.error(error.vi)
          reject(error)
        })
    })
  }

  /** UpdateCurrentUser user */
  @action updateCurrentUser = userInfo => {
    return new Promise((resolve, reject) => {
      UserRequest.UpdateCurrentUser(userInfo)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  /** UpdateCurrentUserPassword user */
  @action updateCurrentUserPassword = submitData => {
    return new Promise((resolve, reject) => {
      UserRequest.UpdateCurrentUserPassword(submitData)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @action getListAvatar = listUserCode => {
    return new Promise((resolve, reject) => {
      UserRequest.getListAvatar(listUserCode)
        .then(response => {
          // response.data.image.map(item => {
          //   const index = this.userList.data.findIndex(el => el.code === item.code);
          //   if (index > -1) {
          //     this.userList.data[index].image = item.image;
          //   }
          // })
          resolve(response.data.image)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  @action preConnectCloud = () => {
    return new Promise((resolve, reject) => {
      UserRequest.preConnectCloud()
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  @action setFilter = (filterName, filterValue) => {
    if (typeof filterName !== 'string') return
    this[filterName] = filterValue
  }

  /** Clear store */
  @action clearStore = () => {
    console.log('clearStore userStore')
    this.userList = []
    this.userListPageIndex = 0
    this.userListPageSize = 10
    this.userListTotalCount = 0
    this.userListKeyword = undefined
    this.userListStatus = undefined
    this.userListDepartmentCode = undefined
    this.userListSortDirection = undefined
    this.userListSortBy = undefined
    this.userListHasAdmin = undefined
    this.selectedUser = {}
    this.companyCode = null
  }
}

export default new UserStore()
