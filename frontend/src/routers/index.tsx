import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import RideEstimate from '../pages/RideEstimate';
import RideHistory from '../pages/RideHistory';
import RideLayout from '../pages/layouts/RideLayout';

import { ERoutes } from '../types/enums/router.enum';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ERoutes.RIDE} element={<RideLayout />}>
          <Route path={ERoutes.RIDE_ESTIMATE} element={<RideEstimate />} />
          <Route path={ERoutes.RIDE_HISTORY} element={<RideHistory />} />
        </Route>
        
        <Route path={ERoutes.ANY} element={<Navigate to={ERoutes.RIDE_ESTIMATE} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
