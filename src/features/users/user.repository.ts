import User, {UserAttributes} from '../../db/models/Users';

export const getAllUsersRpo = async () => {
  const users = await User.findAll();
  return users.map((user) => user.toJSON());
};

export const getUserByIdRpo = async (id) => {
  const user = await User.findOne({
    where: {id},
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user?.toJSON();
};

export const createUserRpo = async (data: UserAttributes) => {
  const user = await User.create(data);
  return user.toJSON();
};

export const updateUserRpo = async (id, data: UserAttributes) => {
  const user = await User.findOne({where: {id}});
  if (!user) {
    throw new Error('User not found');
  }
  await user.update(data);
  return user.toJSON();
};

export const deleteUserRpo = async (id) => {
  const user = await User.findOne({where: {id}});
  if (!user) {
    throw new Error('User not found');
  }
  await user.destroy();
  return user.toJSON();
};

export const getUserByEmailRpo = async (email) => {
  const user = await User.findOne({where: {email}});
  return user?.toJSON();
}
