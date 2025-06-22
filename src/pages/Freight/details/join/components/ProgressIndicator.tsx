import { JoinFormStep } from '../types';

interface ProgressIndicatorProps {
	currentStep: JoinFormStep;
}

const steps = [
	{ key: 'locations' as JoinFormStep, label: 'Ubicaciones', number: 1 },
	{ key: 'package' as JoinFormStep, label: 'Paquete', number: 2 },
	{ key: 'review' as JoinFormStep, label: 'Revisión', number: 3 },
];

const ProgressIndicator = ({ currentStep }: ProgressIndicatorProps) => {
	const currentStepIndex = steps.findIndex(step => step.key === currentStep);

	return (
		<div className="flex items-center justify-center">
			{steps.map((step, index) => {
				const isActive = index === currentStepIndex;
				const isCompleted = index < currentStepIndex;

				return (
					<div key={step.key} className="flex items-center">
						{/* Step Circle */}
						<div className="flex flex-col items-center">
							<div
								className={`
										w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
										${
											isActive
												? 'bg-blue-600 text-white ring-4 ring-blue-100'
												: isCompleted
												? 'bg-green-500 text-white'
												: 'bg-gray-200 text-gray-500'
										}
									`}
							>
								{isCompleted ? (
									<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path
											fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								) : (
									step.number
								)}
							</div>
							<span
								className={`
										mt-2 text-xs font-medium text-center
										${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}
									`}
							>
								{step.label}
							</span>
						</div>

						{/* Connector Line */}
						{index < steps.length - 1 && (
							<div className="mx-4">
								<div
									className={`
											w-16 h-0.5 transition-all duration-200
											${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
										`}
								/>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default ProgressIndicator;
