import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { IUpdateUserProfileParams } from '@/interfaces/user';
import { updateUserProfile } from '@/features/user/asyncActions';
import { useAuth } from '@/hooks/useAuth';

interface ITransporterProfileValues {
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  plate: string;
  storageLength: string | number;
  storageWidth: string | number;
  storageHeight: string | number;
  license: File | null;
}

export const useTransporterProfile = () => {
  const dispatch: AppDispatch = useDispatch();

  const { currentUser, isLoading, error } = useAuth();

  const initialValues: ITransporterProfileValues = {
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    phone: currentUser?.phone || '',
    username: currentUser?.username || '',
    plate: currentUser?.vehicle?.plate || '',
    storageLength: currentUser?.vehicle?.dimensions?.length || '',
    storageWidth: currentUser?.vehicle?.dimensions?.width || '',
    storageHeight: currentUser?.vehicle?.dimensions?.height || '',
    license: null,
  };

  const handleUpdateProfile = async (values: ITransporterProfileValues) => {
    const params: IUpdateUserProfileParams = {
      id: currentUser?._id || '',
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      vehicle: {
        plate: values.plate,
        dimensions: {
          length: Number(values.storageLength),
          width: Number(values.storageWidth),
          height: Number(values.storageHeight),
        },
      },
    };
    // Si se proporciona una licencia, se agrega al objeto de actualización
    if (values.license) params.license = values.license;

    dispatch(updateUserProfile(params));
  };

  return {
    initialValues,
    handleUpdateProfile,
    isLoading,
    error,
  };
};
