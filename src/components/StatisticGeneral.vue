<template>
  <ul>
    <li>osallistujia: {{ statistic.follower + statistic.leader }} </li>
    <li>maksaneita: {{ statistic.paid }}</li>
    <li>tuotot: {{ statistic.totalPaid }} € / {{ statistic.totalAmount }} €</li>
  </ul>
</template>

<script>
export default {
  name: 'General Statistic',
  props: {
    statistic: Object,
  },
}
</script>

<style lang="scss">
</style>
