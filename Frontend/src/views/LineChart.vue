<template>
  <canvas ref="lineChart" style="width: 100%; height: 400px"></canvas>
</template>

<script>
import Chart, { layouts } from "chart.js/auto";
import axios from "axios";

export default {
  //   name: 'LineChart',
  data() {
    return {
      chartHeight: 300, // set the desired height here
    };
  },
  mounted() {
    this.fetchData(this.$route.params.id);
  },
  methods: {
    fetchData() {
      axios
        .get(import.meta.env.VITE_ROOT_API + "/customers/count")
        .then((response) => {
          this.renderChart(response.data.countsByDay);
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });
    },
    getLabels() {
      let arr = [];
      for (let i = 1; i <= 30; i++) {
        arr.push(i);
      }
      return arr;
    },
    renderChart(countsByDay) {
      const ctx = this.$refs.lineChart.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: this.getLabels(),
          datasets: [
            {
              label: "Glasses",
              data:
                countsByDay?.Glasses &&
                !Array.isArray(countsByDay?.Glasses) &&
                typeof countsByDay?.Glasses === "object"
                  ? Object.values(countsByDay?.Glasses)
                  : [],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Contacts",
              data:
                countsByDay?.Contacts &&
                !Array.isArray(countsByDay?.Contacts) &&
                typeof countsByDay?.Contacts === "object"
                  ? Object.values(countsByDay?.Contacts)
                  : [],
              backgroundColor: "orange",
              borderColor: "orange",
              borderWidth: 1,
            },
            {
              label: "Accessories",
              data:
                countsByDay?.Accessories &&
                !Array.isArray(countsByDay?.Accessories) &&
                typeof countsByDay?.Accessories === "object"
                  ? Object.values(countsByDay?.Accessories)
                  : [],
              backgroundColor: "balck",
              borderColor: "black",
              borderWidth: 1,
            },
            {
              label: "Non-Reflective",
              data:
                countsByDay['Non-Reflective'] &&
                !Array.isArray(countsByDay['Non-Reflective']) &&
                typeof countsByDay['Non-Reflective'] === "object"
                  ? Object.values(countsByDay['Non-Reflective'])
                  : [],
              backgroundColor: "blue",
              borderColor: "blue",
              borderWidth: 1,
            },
            {
              label: "Reflective",
              data:
                countsByDay?.Reflective &&
                !Array.isArray(countsByDay?.Reflective) &&
                typeof countsByDay?.Reflective === "object"
                  ? Object.values(countsByDay?.Reflective)
                  : [],
              backgroundColor: "brown",
              borderColor: "brown",
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Daily Revenues", // Add your title here
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>

<style>
.main {
  height: 200px;
}
</style>