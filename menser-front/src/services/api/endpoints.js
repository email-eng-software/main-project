import useAuthStore from '../../stores/auth';
import api from './instance';

// User sessions
export const login = async (credentials) => {
  const { setAuth } = useAuthStore.getState();
  const { data } = await api.post('/login', credentials);

  setAuth(data.accessToken);
  return data;
};
export const logout = async () => {
  const { clearAuth } = useAuthStore.getState();
  await api.post('/logout');

  clearAuth();
};
export async function refresh() {
  const { setAuth } = useAuthStore.getState();
  const { data } = await api.get('/refresh');

  setAuth(data.accessToken);
  return data;
}

// Users
export const getUsers = async (filters = {}) => {
  const { data } = await api.get('/users', { params: filters });

  return data;
};
export const createUser = async (newUser) => {
  const { data } = await api.post('/users', newUser);

  return data;
};
export const updateUser = async ({ _id, newUserData }) => {
  const { data } = await api.put(`/users/${_id}`, newUserData);

  return data;
};
export const deleteUser = async (_id) => {
  const { data } = await api.delete(`/users/${_id}`);

  return data;
};

// Messages
export const getMessages = async (userId) => {
  const { data } = await api.get(`/messages/${userId}/users/archived`);

  return data;
};

export const getMessageById = async ({ messageId, type }) => {
  const { data } = await api.get(`/messages/${messageId}/${type}`);

  return data;
};
export const saveMessageDraft = async ({ sender, responseTo }) => {
  const { data } = await api.post(`/messages`, { sender, responseTo });

  return data;
};
export const sendMessage = async ({ messageId, inputData }) => {
  const { data } = await api.put(`/messages/${messageId}/send`, inputData);

  return data;
};
export const updateMessageDraft = async ({ messageId, inputData }) => {
  console.log({ messageId, inputData });
  const { data } = await api.put(
    `/messages/${messageId}/update-draft`,
    inputData
  );

  return data;
};
