import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { SuspenseWithPerf } from 'reactfire'
import CityRoute from 'routes/Cities/routes/City'
import LoadingSpinner from 'components/LoadingSpinner'
import { renderChildren } from 'utils/router'
import CitiesList from '../CitiesList'

function CitiesPage() {
  const match = useRouteMatch()
  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([CityRoute])}
      {/* Main Route */}
      <Route
        exact
        path={match.path}
        render={() => (
          <SuspenseWithPerf
            fallback={<LoadingSpinner />}
            traceId="load-cities">
            <CitiesList />
          </SuspenseWithPerf>
        )}
      />
    </Switch>
  )
}

export default CitiesPage
