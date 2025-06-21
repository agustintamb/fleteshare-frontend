import { IAddress } from '@/interfaces/address';
import { PriceCalculation } from '@/interfaces/freight';

export type FormStep = 'locations' | 'package' | 'schedule' | 'review';

export interface FreightFormData {
  pickup: IAddress;
  delivery: IAddress;
  packageDetails: {
    width: number;
    height: number;
    length: number;
    description: string;
  };
  scheduledDate: string;
}

export interface StepValidation {
  isValid: boolean;
  errors?: string[];
}

export interface FormStepProps {
  formData: FreightFormData;
  updateFormData: (updates: Partial<FreightFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
  priceCalculation?: PriceCalculation | null;
}
