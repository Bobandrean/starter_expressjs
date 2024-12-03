import {generatePassword} from '../../helpers/tools';
import {
  getAllUsersRpo,
  getUserByIdRpo,
  createUserRpo,
  updateUserRpo,
  deleteUserRpo,
} from './user.repository';

export const getAllUsersSvc = async () => {
  return await getAllUsersRpo();
};

export const getUserByIdSvc = async (id) => {
  return await getUserByIdRpo(id);
};

export const createUserSvc = async (data) => {
  const hashedPassword = await generatePassword(data.email, data.password);

  const tempData = {
    ...data,
    password: hashedPassword.password,
  };

  return await createUserRpo(tempData);
};

export const updateUserSvc = async (id, data) => {
  return await updateUserRpo(id, data);
};

export const deleteUserSvc = async (id) => {
  return await deleteUserRpo(id);
};
