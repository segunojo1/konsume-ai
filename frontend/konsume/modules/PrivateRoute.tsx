import { useContext, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useSetupContext } from '../context/SetupContext';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated }: any = useSetupContext();
  const router = useRouter();

  if (!isAuthenticated()) {
    router.replace('/login');
    return null; // Return null to prevent rendering children while redirecting
  }

  return <>{children}</>;
};

export default PrivateRoute;
