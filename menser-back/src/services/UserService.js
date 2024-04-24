import { NotFoundError } from '../errors/baseErrors.js';
import UserModel from '../models/UserModel.js';

// eslint-disable-next-line object-curly-newline
export async function get({ search, limit, page, sort }) {
  const searchOptions = search ? { $text: { $search: search } } : {};
  let query = UserModel.find(searchOptions);

  if (limit) query = query.limit(limit).skip(page * limit);
  if (sort) query = query.sort({ [sort.field]: sort.order });

  return query.lean().exec();
}

export async function getById(_id) {
  const foundUser = await UserModel.findById(_id).lean().exec();
  if (!foundUser) throw new NotFoundError('User not found');

  return foundUser;
}

export async function create(inputData) {
  const { password, ...newUser } = (
    await UserModel.create(inputData)
  ).toObject();

  return newUser;
}

export async function update({ _id, inputData }) {
  const foundUser = await UserModel.findById(_id).exec();
  if (!foundUser) throw new NotFoundError('User not found');

  // TODO: delete and update file in the AWS S3
  return foundUser.set(inputData).save();
}

export async function destroy(_id) {
  const foundUser = await UserModel.findById(_id).exec();
  if (!foundUser) throw new NotFoundError('User not found');

  await foundUser.deleteOne();
}
