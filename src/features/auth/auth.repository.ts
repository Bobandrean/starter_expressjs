import User, {UserAttributes} from '../../db/models/Users';
import { hashPassword } from '../../helpers/tools';

export const getAllUsersRpo = async () => {
  const users = await User.findAll();
  return users.map((user) => user.toJSON());
};

export const registerUserRpo = async (data: UserAttributes) => {
  // hashing password
}
