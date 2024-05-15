import { action, observable } from "mobx";
import { CommandRequest } from "../requests/CommandRequest";

class CommandStore {
  @observable sideMenuCounter = {
    work: 0,
    proposal: 0,
    unread_internal_message: 0,
  };
  @observable dashboardSideMenuCounter = {};
  /** Command list */
  @observable commandList = [];

  getSideMenuCounterDashboard = async (types) => {
    let response = await CommandRequest.getSideMenuCounter(types);
    if (types?.includes("PROPOSAL"))
      this.dashboardSideMenuCounter = {
        ...this.dashboardSideMenuCounter,
        proposal_other: response.data.proposal_other,
      };
    if (types?.includes("INCOMING"))
      this.dashboardSideMenuCounter = {
        ...this.dashboardSideMenuCounter,
        unread_incoming: response.data.unread_incoming,
      };
    if (types?.includes("TASK"))
      this.dashboardSideMenuCounter = {
        ...this.dashboardSideMenuCounter,
        overdue_task: response.data.overdue_task,
      };
    if (types?.includes("OUTGOING"))
      this.dashboardSideMenuCounter = {
        ...this.dashboardSideMenuCounter,
        unread_outgoing: response.data.unread_outgoing,
      };
    if (types?.includes("WORK"))
      this.dashboardSideMenuCounter = {
        ...this.dashboardSideMenuCounter,
        work: response.data.work,
      };
  };
  getSideMenuCounter = async (types) => {
    let response = await CommandRequest.getSideMenuCounter(types);
    this.sideMenuCounter = response.data;
  };

  @action getCommandList = () => {
    return new Promise((resolve, reject) => {
      CommandRequest.getCommandList()
        .then((response) => {
          response.data.forEach((item) => {
            if (item.code === "hi") {
              item.url = "";
            }
          });

          this.commandList = response.data;
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  /** Clear store */
  @action clearStore = () => {
    // this.commandList.length = 0
    this.dashboardSideMenuCounter = {};
  };
}

export default new CommandStore();
