import { loadable } from 'utils/router'

export default {
  path: ':cityId',
  authRequired: true,
  component: loadable(() =>
    import(/* webpackChunkName: 'City' */ './components/CityPage')
  )
}
