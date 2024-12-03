import {getAllUsersRpo} from './auth.repository';

export const getAllUsersSvc = async () => {
  return await getAllUsersRpo();
};
