import { action, observable } from 'mobx'
import { ACLRequest } from '../requests/ACLRequest'
import authenticationStore from './authenticationStore'

class ACLStore {
  // Page list salary

  @observable aclActionList = []
  @observable aclActionUpdateList = []

  @observable aclGroupList = []

  @action getACLActionList = () => {
    return new Promise((resolve, reject) => {
      ACLRequest.getACLActionList()
        .then(response => {
          this.aclActionList = response.data || []
          this.aclActionUpdateList = response.data || []
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @action clearActionList = () => {
    this.aclActionList.length = 0
    this.aclActionUpdateList.length = 0
  }
  @action clearAclGroupList = () => {
    this.aclGroupList.length = 0
  }

  @action getACLDetail = code => {
    return new Promise((resolve, reject) => {
      ACLRequest.getACLDetail(code)
        .then(response => {
          this.aclActionList = response.data.actions || []
          this.aclActionUpdateList = response.data.actions || []
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @action setAclActionUpdateList = payload => {
    this.aclActionUpdateList = payload
  }

  @action getACLGroupList = () => {
    return new Promise((resolve, reject) => {
      ACLRequest.getACLGroupList()
        .then(response => {
          this.aclGroupList = response.data || []
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @action updateACLGroup = (code, payload) => {
    return new Promise((resolve, reject) => {
      ACLRequest.updateACLGroup(code, payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  @action assignACLGroup = payload => {
    return new Promise((resolve, reject) => {
      ACLRequest.assignACLGroup(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @action createACLGroup = payload => {
    return new Promise((resolve, reject) => {
      ACLRequest.createACLGroup(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  @action deleteACLGroup = payload => {
    return new Promise((resolve, reject) => {
      ACLRequest.deleteACLGroup(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @action cloneACLGroup = code => {
    return new Promise((resolve, reject) => {
      ACLRequest.cloneACLGroup(code)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @observable aclAclGroupName = ''
  @observable aclActionsByUser = []

  @action getACLDetailByUser = userName => {
    return new Promise((resolve, reject) => {
      ACLRequest.getACLDetailByUser(userName)
        .then(response => {
          // console.log(response)
          this.aclAclGroupName = response.data.name
          this.aclActionsByUser = response.data.actions || []
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  @action checkAccessControlAction = aclActionType => {
    const actionType = this.aclActionsByUser.find(
      item => item.code === aclActionType
    )
    return (
      !!actionType?.status ||
      authenticationStore.isAccountAdmin ||
      authenticationStore.isSuperAdmin
    )
  }
}

export default new ACLStore()
