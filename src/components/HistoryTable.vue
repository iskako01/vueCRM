<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) in records.records" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ record.amount }}</td>
        <td>{{ record.date }}</td>
        <td>{{ record.categoryName.title }}</td>
        <td>
          <span class="white-text badge red" :class="[record.typeClass]">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {

  props: {
    records: {
      type: Array,
    },
  },
  setup(props) {
    const records = props;

    return { records };
  },
};
</script>

<style>
</style>