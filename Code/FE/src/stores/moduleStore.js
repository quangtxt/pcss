import { action, observable, toJS } from 'mobx'
import { ModuleRequest } from '../requests/ModuleRequest'

class ModuleStore {
  @observable moduleList = []

  @observable moduleUpdatedList = []

  @action setModuleUpdatedList = payload => {
    this.moduleUpdatedList = payload
  }

  @action getModuleList = () => {
    return new Promise((resolve, reject) => {
      ModuleRequest.getModuleList()
        .then(response => {
          this.moduleList = response.data || []
          this.moduleUpdatedList = response.data || []
          resolve(response)
        })
        .catch(error => {
          this.moduleList = []
          this.moduleUpdatedList = []
          reject(error)
        })
    })
  }

  @action updateModules = payload => {
    return new Promise((resolve, reject) => {
      ModuleRequest.updateModules(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @action clearModuleStore = () => {
    // this.moduleList.length = 0
    this.moduleUpdatedList.length = 0
  }

  @action checkAccessModule = moduleCode => {
    let isAccess = false
    const moduleFlatList = []
    this.moduleList.forEach(item => {
      moduleFlatList.push({
        ...toJS(item),
        sub_modules: null,
      })
      if (item.sub_modules?.length > 0) {
        item.sub_modules.forEach(el => {
          moduleFlatList.push(toJS(el))
        })
      }
    })
    const currentModule = moduleFlatList.find(item => item.code === moduleCode)
    if (moduleCode && !currentModule?.status) {
      return false
    } else {
      isAccess = true
    }
    return isAccess
  }
}

export default new ModuleStore()
