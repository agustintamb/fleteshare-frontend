import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { useAuth } from '@/hooks/useAuth';
import { IAddress } from '@/interfaces/freight';
import { IUpdateUserProfileParams } from '@/interfaces/user';
import { updateUserProfile } from '@/features/user/asyncActions';

interface ICustomerProfileValues {
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  address: IAddress | null;
}

export const useCustomerProfile = () => {
  const dispatch: AppDispatch = useDispatch();

  const { currentUser, isLoading, error } = useAuth();

  const initialValues: ICustomerProfileValues = {
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    phone: currentUser?.phone || '',
    username: currentUser?.username || '',
    address: currentUser?.address || null,
  };

  const handleUpdateProfile = async (values: ICustomerProfileValues) => {
    const params: IUpdateUserProfileParams = {
      id: currentUser?._id || '',
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      address: values.address,
    };

    dispatch(updateUserProfile(params));
  };

  return {
    initialValues,
    isLoading,
    error,
    handleUpdateProfile,
  };
};
