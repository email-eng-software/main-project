import * as MessageService from '../services/MessageService.js';
import asyncHandler from '../utils/general/asyncHandler.js';
import { SUCCESS_CODES } from '../utils/general/constants.js';
import * as MessageValidator from '../validators/MessageValidator.js';

export const get = asyncHandler(async (req, res) => {
  const { type, ...params } = MessageValidator.get(req);
  const typeToService = {
    sended: MessageService.getSended,
    received: MessageService.getReceived,
    draft: MessageService.getDraft,
    archived: MessageService.getArchived,
  };
  const messages = await typeToService[type](params);

  res.status(SUCCESS_CODES.OK).json(messages);
});

export const getById = asyncHandler(async (req, res) => {
  const { _id, type } = MessageValidator.getById(req);
  const typeToService = {
    parent: MessageService.getByParentId,
    draft: MessageService.getDraftById,
    archived: MessageService.getArchivedById,
  };

  const message = await typeToService[type](_id);

  res.status(SUCCESS_CODES.OK).json(message);
});

export const saveDraft = asyncHandler(async (req, res) => {
  const inputData = MessageValidator.saveDraft(req);
  const newMessage = await MessageService.saveDraft(inputData);

  res.status(SUCCESS_CODES.CREATED).json(newMessage);
});

export const uploadAttachment = asyncHandler(async (req, res) => {
  const inputData = MessageValidator.uploadAttachment(req);
  const newMessage = await MessageService.uploadAttachment(inputData);

  res.status(SUCCESS_CODES.CREATED).json(newMessage);
});

export const updateDraft = asyncHandler(async (req, res) => {
  const { _id, ...inputData } = MessageValidator.updateDraft(req);
  const updatedMessage = await MessageService.updateDraft({ _id, inputData });

  res.status(SUCCESS_CODES.OK).json(updatedMessage);
});

export const send = asyncHandler(async (req, res) => {
  const { _id, ...inputData } = MessageValidator.send(req);
  const updatedMessage = await MessageService.send({ _id, inputData });

  res.status(SUCCESS_CODES.OK).json(updatedMessage);
});

export const toggleState = asyncHandler(async (req, res) => {
  const inputData = MessageValidator.toggleState(req);
  await MessageService.toggleState(inputData);

  res.sendStatus(SUCCESS_CODES.NO_CONTENT);
});

export const destroy = asyncHandler(async (req, res) => {
  const { _id } = MessageValidator.destroy(req);
  await MessageService.destroy(_id);

  res.sendStatus(SUCCESS_CODES.NO_CONTENT);
});
