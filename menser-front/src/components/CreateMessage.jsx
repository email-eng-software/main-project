/* eslint arrow-body-style: 0 */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Textarea, Label, TextInput } from 'flowbite-react';

import setToast from '../utils/toast.utils';
import {
  useGetMessageById,
  useSendMessage,
  useUpdateMessageDraft,
} from '../hooks/query/messages';

const Spinner = (
  <div role="status">
    <svg
      aria-hidden="true"
      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

export default function CreateMessage() {
  const formEl = useRef(null);
  const [formFields, setFormFields] = useState({
    recipientsStr: '',
    subject: '',
    content: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    recipientsStr: false,
    content: false,
  });
  const { messageId } = useParams();

  const { data: messageDraft, isLoading: isLoadingGeMessage } =
    useGetMessageById({
      messageId,
      type: 'draft',
      onError: (err) => {
        console.error(err);
        setToast(
          'error',
          'Ocorreu um problema no servidor ao tentar resgatar o rascunho. Tente novamente mais tarde'
        );
      },
    });

  useEffect(() => {
    if (!messageDraft) return;

    setFormFields((prev) => ({
      ...prev,
      recipientsStr: messageDraft.recipientsStr,
      subject: messageDraft.subject,
      content: messageDraft.content,
    }));
  }, [messageDraft]);

  const navigate = useNavigate();

  const { mutate: sendMessage, isLoading: isLoadingSendMessage } =
    useSendMessage({
      onSuccess: () => {
        setToast('success', 'Mensagem enviada com sucesso');
        navigate('/');
      },
      onError: (err) => {
        console.error(err);
        setToast(
          'error',
          'Ocorreu um problema no servidor. Tente novamente mais tarde'
        );
      },
    });

  // const { mutate: updateMessageDraft } = useUpdateMessageDraft({
  //   onError: (err) => {
  //     console.error(err);
  //     setToast(
  //       'error',
  //       'Ocorreu um problema no servidor. Tente novamente mais tarde'
  //     );
  //   },
  // });
  // const updateMessageDraftEvent = useCallback(() => {
  //   updateMessageDraft({
  //     messageId,
  //     inputData: {
  //       recipientsStr: formFields.recipientsStr,
  //       subject: formFields.subject,
  //       content: formFields.content,
  //     },
  //   });
  // }, [messageId]);

  // useLayoutEffect(() => {
  //   return updateMessageDraftEvent;
  // }, [updateMessageDraftEvent]);

  const validateFields = () => {
    if (!formFields.recipientsStr || !formFields.content) {
      setToast('error', 'Preencha os campos obrigatórios.');
      setFieldErrors({
        email: !formFields.recipientsStr,
        password: !formFields.content,
      });
      return true;
    }
    return false;
  };

  const handleChange = (name, value) => {
    setFormFields({ ...formFields, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: false });
  };

  const handleClick = () => {
    const hasError = validateFields();
    if (hasError) return;

    sendMessage({
      messageId,
      inputData: {
        recipientsStr: formFields.recipientsStr,
        subject: formFields.subject,
        content: formFields.content,
      },
    });
  };

  if (isLoadingGeMessage) return <div>Carregando...</div>;

  return (
    <form ref={formEl} className="flex flex-col gap-4 px-4">
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="recipientsStr" value="*Destinatário:" />
        </div>
        <TextInput
          defaultValue={messageDraft?.recipientsStr || ''}
          onChange={(e) => handleChange('recipientsStr', e.target.value)}
          id="recipientsStr"
          type="text"
          required
        />
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="subject" value="Assunto:" />
        </div>
        <TextInput
          defaultValue={messageDraft?.subject || ''}
          onChange={(e) => handleChange('subject', e.target.value)}
          id="subject"
          type="text"
        />
      </div>
      <div className="w-10/12">
        <div className="mb-2 block">
          <Label htmlFor="content" value="*Contéudo:" />
        </div>
        <Textarea
          defaultValue={messageDraft?.content || ''}
          onChange={(e) => handleChange('content', e.target.value)}
          id="content"
          required
          rows={10}
          className="resize-none"
        />
      </div>
      <Button className="max-w-md" onClick={handleClick}>
        {isLoadingSendMessage ? <Spinner /> : 'Enviar'}
      </Button>
    </form>
  );
}
