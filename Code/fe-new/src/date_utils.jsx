import moment from "moment";

const date_utils = {
  current: () => {
    return new Date();
  },

  //ex: 2021-01-18T07:00:00+07:00
  fromString: (s) => {
    return moment(s);
  },

  toBeginDay: (d) => {
    d = new Date(d);
    d.setHours(0, 0, 0, 0);
    return d;
  },

  toEndDay: (d) => {
    d = new Date(d);
    d.setHours(23, 59, 59, 0);
    return d;
  },

  weekRange: (d) => {
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1);
    let monday = new Date(d.setDate(diff));

    let days = [];
    let i;
    for (i = 0; i < 7; i++) {
      let day = moment(monday).add(i, "days");
      days.push(date_utils.toBeginDay(day));
    }

    return days;
  },

  compare: (d1, d2) => {
    // console.log(d1, d2)
    if (d1 > d2) return 1;
    else if (d1 < d2) return -1;
    else return 0;
  },
};

export default date_utils;
