import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNavbar from '@/components/layout/MobileNavbar';
import LandingHeader from '@/components/layout/LandingHeader';

const MainLayout = ({ isLanding = false }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {isLanding ? <LandingHeader /> : <Header />}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-6 pt-20">
        <Outlet />
      </main>
      {isLanding && <Footer />}
      {!isLanding && isAuthenticated && <MobileNavbar />}
    </div>
  );
};

export default MainLayout;
