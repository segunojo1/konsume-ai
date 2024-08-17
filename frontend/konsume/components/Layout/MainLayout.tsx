import React, { useContext, useEffect } from 'react';

import { twMerge } from 'tailwind-merge';

import { MainLayoutProps } from '../../@types';
import MainLayoutContext from '../../context/LayoutContext';
import Sidebar from '@/modules/dashboard/Sidebar';
import TopBar from '@/modules/TopBar';

function MainLayout({
  children,
  className,
  showDashboardSidebar = true,
  activePage,
  includeMarginTop = true,
}: MainLayoutProps) {
  const {setActivePage, toggled, setToggled } = useContext(MainLayoutContext);

  useEffect(() => {
    setActivePage(activePage as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={twMerge('w-full relative h-screen overflow-x-hidden', className)}>
      <TopBar setToggled={setToggled}/>

      {showDashboardSidebar && <Sidebar toggled={toggled} setToggled={setToggled}/>}
      <div className={`w-full ${includeMarginTop ? 'mt-5' : ''}`}>{children}</div>
    </div>
  );
}

export default MainLayout;
