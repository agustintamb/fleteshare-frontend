import { IAddress } from '@/interfaces/address';
import { IFreight, PriceCalculation } from '@/interfaces/freight';

export type JoinFormStep = 'locations' | 'package' | 'review';

export interface JoinFreightFormData {
  pickup: IAddress;
  delivery: IAddress;
  packageDetails: {
    width: number;
    height: number;
    length: number;
    description: string;
  };
}

export interface StepValidation {
  isValid: boolean;
  errors?: string[];
}

export interface JoinFormStepProps {
  formData: JoinFreightFormData;
  updateFormData: (updates: Partial<JoinFreightFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
  freight: IFreight;
  priceCalculation?: PriceCalculation | null;
}
