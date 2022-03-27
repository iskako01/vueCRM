
<script>
import { Pie } from "vue3-chart-v2";

export default {
  name: "chart",
  extends: Pie,

async  mounted() {
    const categories = await this.$store.dispatch("fetchCategories");

    const records = await this.$store.dispatch("fetchRecords");

    this.renderChart({
      labels: categories.map((c) => c.title),
      datasets: [
        {
          label: "Расходы по категориям",
          data: categories.map((c) => {
            return records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === "outcome") {
                total += r.amount;
              }
              return total;
            }, 0);
          }),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  },
};
</script>

