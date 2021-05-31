const labels = ["Memory Used", "Memory Free"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "System Info",
      backgroundColor: ["#0074D9", "#FF4136"],
      borderColor: "rgb(100,99,32)",
      data: [2, 10],
    },
  ],
};

const config = {
  type: "doughnut",
  data,
  options: {},
};

var myChart = new Chart(document.getElementById("myRam"), config);
