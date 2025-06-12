// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorMessage = (payload: any): string => {
  let message;
  if (payload?.response?.data?.error) {
    message = payload.response.data.error;
  } else if (payload?.message) {
    message = payload.message;
  } else if (payload?.error) {
    message = payload.error;
  } else {
    message = 'Ha ocurrido un error inesperado';
  }
  return message;
};
