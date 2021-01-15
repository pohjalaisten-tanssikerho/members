<template>
  <ul>
    <li>osallistujia: {{ total }} </li>
    <li>maksaneita: {{ payment.personPaid }}</li>
    <li>tuotot: {{ income.paid }} € / {{ income.total }} €</li>
  </ul>
</template>

<script>
export default {
  name: 'General Statistic',
  props: {
    income: Object,
    payment: Object,
    total: Number,
  },
}
</script>

<style lang="scss">
</style>
