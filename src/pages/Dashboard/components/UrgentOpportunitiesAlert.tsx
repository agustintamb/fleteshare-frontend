import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { IFreight } from '@/interfaces/freight';

interface UrgentOpportunitiesAlertProps {
  allFreights: IFreight[];
}

export const UrgentOpportunitiesAlert = ({ allFreights }: UrgentOpportunitiesAlertProps) => {
  // Calculate urgent opportunities from ALL freights (last 30 minutes)
  const thirtyMinutesAgo = new Date();
  thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

  const urgentOpportunities = allFreights.filter(freight => {
    const createdDate = new Date(freight.createdAt);
    return createdDate >= thirtyMinutesAgo && freight.status === 'requested';
  }).length;

  if (urgentOpportunities === 0) return null;

  return (
    <>
      {/* Custom animations for urgent opportunities */}
      <style>{`
				@keyframes shimmer {
					0% {
						background-position: -200% 0;
					}
					100% {
						background-position: 200% 0;
					}
				}

				@keyframes glow {
					0%,
					100% {
						box-shadow: 0 0 5px rgba(244, 114, 182, 0.4);
					}
					50% {
						box-shadow: 0 0 20px rgba(244, 114, 182, 0.8), 0 0 30px rgba(244, 114, 182, 0.6);
					}
				}

				.urgent-alert {
					background: linear-gradient(90deg, #fdf2f8 25%, #fce7f3 50%, #fdf2f8 75%);
					background-size: 200% 100%;
					animation: shimmer 2s infinite, glow 2s infinite;
				}
			`}</style>

      <div className="urgent-alert relative overflow-hidden rounded-lg p-6 border-2 border-pink-200 shadow-lg">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100 to-transparent opacity-50 animate-pulse"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-pink-100 rounded animate-bounce">
              <Zap className="h-4 w-4 text-pink-600" />
            </div>
            <span className="font-semibold text-pink-800 animate-pulse">
              ¡Oportunidad Disponible!
            </span>
            <span className="ml-auto text-lg font-bold text-pink-900 animate-pulse">
              {urgentOpportunities} {urgentOpportunities === 1 ? 'nueva' : 'nuevas'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {urgentOpportunities === 1
                ? `Se ha publicado una nueva solicitud de flete en los últimos 30 minutos`
                : `Se han publicado ${urgentOpportunities} nuevas solicitudes de flete en los últimos 30 minutos`}
            </span>
            <Link to={ROUTES.FREIGHT}>
              <button className="px-3 py-1.5 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Ver oportunidades
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
