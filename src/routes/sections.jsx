import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import SvLogs from 'src/sections/Reports/svLogs';
import LockLogs from 'src/sections/Reports/lockLogs';
import LoginLogs from 'src/sections/Reports/loginLogs';
import SSNReport from 'src/sections/Reports/ssnReport';
import FaultReport from 'src/sections/Reports/faultReport';
import { ProductsView } from 'src/sections/MachineData/view';
import { UserView } from 'src/sections/macAddressTable/view';
import SelfMap from 'src/sections/Reports/LoginMaps/selfMap';
import ViewMap from 'src/sections/Reports/LoginMaps/viewMap';
import DailyReports from 'src/sections/Reports/dailyReports';
import HourlyReport from 'src/sections/Reports/HourlyReport';
import ColorSetting from 'src/sections/Settings/colorSetting';
import MachinePage from 'src/sections/Machines/view/user-view';
import CustomerPage from 'src/sections/Customers/customerPage';
import InventoryPage from 'src/sections/Inventory/inventoryPage';
import MachineSetting from 'src/sections/Settings/machineSetting';
import PaytmTransactions from 'src/sections/Reports/paytmTransactions';
import MachineMapView from 'src/sections/MachineMap/view/products-view';










// import StatusSelection from 'src/sections/products/statusSelection';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
   
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {path: 'dashboard', element: <IndexPage />},
        { path: 'user', element: <UserPage /> },
        { path: 'machines', element: <MachinePage/> },
        { path: 'machineData', element: <ProductsView /> },
        { path: 'machineMap', element: <MachineMapView/> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'dailyReports', element: <DailyReports/>},
        { path: 'loginLogs', element: <LoginLogs/>},
        { path: 'faultReport', element: <FaultReport/>},
        { path: 'hourlyReport', element: <HourlyReport/>},
        { path: 'ssnReport', element: <SSNReport/>},
        { path: 'inventory', element: <InventoryPage/>},
        { path: 'customers', element: <CustomerPage/>},
        { path: 'machineSetting', element: <MachineSetting/>},
        { path: 'colorSetting', element: <ColorSetting/>},
        { path: 'paytmTransactions', element: <PaytmTransactions/>},
        { path: 'svLogs', element: <SvLogs/>},
        { path: 'lockLogs', element: <LockLogs/>},
        { path: 'selfMap', element: <SelfMap/>},
        { path: 'viewMap', element: <ViewMap/>},
        { path: 'MacTable', element: <UserView/>}
      ],
    },
    {
      path:'/',
      element:<LoginPage/>

    },
   
   
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
