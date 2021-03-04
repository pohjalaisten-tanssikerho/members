import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import StatisticGeneral from '@/components/StatisticGeneral.vue'

describe('StatisticGeneral.vue', () => {
  it('renders statistic correctly', () => {
    const statistic = {
      follower: 14,
      leader: 11,
      paid: 22,
      totalPaid: 1780,
      totalAmount: 2200
    }
    const { getByText } = render(StatisticGeneral, {
      props: { statistic }
    })
    expect(getByText('osallistujia: 25')).toBeInTheDocument()
    expect(getByText('maksaneita: 22')).toBeInTheDocument()
    expect(getByText('tuotot: 1780 € / 2200 €')).toBeInTheDocument()
  })
})
