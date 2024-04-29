import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getMessageById,
  saveMessageDraft,
  sendMessage,
  updateMessageDraft,
} from '../../services/api/endpoints';

export function useGetMessageById({
  messageId,
  type,
  onSuccess = () => {},
  onError = (err) => console.log(err),
} = {}) {
  return useQuery({
    queryKey: ['messages', messageId, type],
    queryFn: () => getMessageById({ messageId, type }),
    onSuccess,
    onError,
  });
}
export function useSaveMessageDraft({
  onSuccess = () => {},
  onError = (err) => console.log(err),
} = {}) {
  return useMutation({
    mutationFn: saveMessageDraft,
    onSuccess,
    onError,
  });
}
export function useSendMessage({
  onSuccess = () => {},
  onError = (err) => console.log(err),
} = {}) {
  return useMutation({
    mutationFn: sendMessage,
    onSuccess,
    onError,
  });
}
export function useUpdateMessageDraft({
  onSuccess = () => {},
  onError = (err) => console.log(err),
} = {}) {
  return useMutation({
    mutationFn: updateMessageDraft,
    onSuccess,
    onError,
  });
}
