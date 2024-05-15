export const lineChartData = {
  labels: ['Week 1, Aug', 'Week 2, Aug', 'Week 3, Aug', 'Week 4, Aug'],
  datasets: [
    {
      label: '1 week',
      data: [18, 43, 22, 35],
      borderColor: 'rgb(27,97,157)',
      backgroundColor: 'rgba(27,97,157,.1)',
      borderWidth: 1,
    },
    {
      label: '> 2 week',
      data: [10, 22, 41, 15],
      borderColor: 'rgb(66,205,162)',
      backgroundColor: 'rgba(66,205,162,.1)',
      borderWidth: 1,
    },
  ],
}
export const lineChartOption = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 10,
        },
      },
    ],
  },
}
export const barChartData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}
export const barChartOption = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}
