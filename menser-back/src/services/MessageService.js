/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import * as awsS3 from '../config/awsS3.js';
import { ObjectId } from '../config/mongo.js';
import { ForbiddenError, NotFoundError } from '../errors/baseErrors.js';
import MessageModel, { STATUS } from '../models/MessageModel.js';
import MessageRecipientsModel from '../models/MessageRecipientsModel.js';
import UserModel from '../models/UserModel.js';
import { COLLECTION_NAMES } from '../utils/general/constants.js';

export async function getSended({ userId, search, limit, page }) {
  const pipeline = [
    {
      $match: {
        isDeleted: false,
        status: STATUS.SENDED,
        sender: new ObjectId(userId),
        responseTo: null,
      },
    },
    {
      $graphLookup: {
        from: COLLECTION_NAMES.MESSAGE,
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'responseTo',
        as: 'responses',
      },
    },
    {
      $set: {
        lastSended: {
          $ifNull: [
            {
              $first: {
                $sortArray: {
                  input: {
                    $filter: {
                      input: '$responses',
                      cond: { $eq: ['$$this.sender', new ObjectId(userId)] },
                    },
                  },
                  sortBy: {
                    sendedAt: -1,
                  },
                },
              },
            },
            '$$ROOT',
          ],
        },
      },
    },
    {
      $set: {
        lastMessage: {
          $ifNull: [
            {
              $first: {
                $sortArray: {
                  input: '$responses',
                  sortBy: {
                    createdAt: -1,
                  },
                },
              },
            },
            '$$ROOT',
          ],
        },
      },
    },
    {
      $sort: {
        'lastMessage.createdAt': -1,
      },
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.MESSAGE_RECIPIENTS,
        localField: 'lastSended._id',
        foreignField: 'message',
        as: 'messageRecipients',
      },
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.USER,
        localField: 'lastSended.sender',
        foreignField: '_id',
        as: 'senderDoc',
      },
    },
    {
      $unwind: '$senderDoc',
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.USER,
        localField: 'messageRecipients.recipient',
        foreignField: '_id',
        as: 'recipients',
      },
    },
    {
      $project: {
        _id: '$lastSended._id',
        parentId: '$_id',
        totalExchangedMessages: { $add: [{ $size: '$responses' }, 1] },
        sender: {
          _id: '$senderDoc._id',
          firstName: '$senderDoc.firstName',
          lastName: '$senderDoc.lastName',
          email: '$senderDoc.email',
          profilePicture: {
            name: '$senderDoc.profilePicture.name',
            url: '$senderDoc.profilePicture.url',
          },
        },
        subject: '$lastSended.subject',
        content: '$lastSended.content',
        recipients: {
          $map: {
            input: '$recipients',
            as: 'recipient',
            in: {
              _id: '$$recipient._id',
              firstName: '$$recipient.firstName',
              lastName: '$$recipient.lastName',
              email: '$$recipient.email',
              profilePicture: {
                name: '$$recipient.profilePicture.name',
                url: '$$recipient.profilePicture.url',
              },
            },
          },
        },
        attachments: {
          $map: {
            input: '$lastSended.attachments',
            as: 'attachment',
            in: {
              name: '$$attachment.name',
              url: '$$attachment.url',
            },
          },
        },
        sendedAt: '$lastSended.sendedAt',
      },
    },
  ];

  if (limit) pipeline.push({ $skip: page * limit }, { $limit: limit });
  // TODO: add search option
  return MessageModel.aggregate(pipeline);
}

export async function getReceived({ userId, search, limit, page }) {
  const pipeline = [
    {
      $match: {
        isDeleted: false,
        recipient: new ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.MESSAGE,
        localField: 'message',
        foreignField: '_id',
        as: 'messageDoc',
      },
    },
    { $unwind: '$messageDoc' },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            '$messageDoc',
            { isArchived: '$isArchived', isDeleted: '$isDeleted', isRead: '$isRead' },
          ],
        },
      },
    },
    {
      $match: {
        status: STATUS.SENDED,
      },
    },
    {
      $graphLookup: {
        from: COLLECTION_NAMES.MESSAGE,
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'responseTo',
        as: 'responsesUp',
      },
    },
    {
      $graphLookup: {
        from: COLLECTION_NAMES.MESSAGE,
        startWith: '$responseTo',
        connectFromField: 'responseTo',
        connectToField: '_id',
        as: 'responsesDown',
      },
    },
    { $set: { responses: { $concatArrays: ['$responsesUp', '$responsesDown'] } } },
    {
      $set: {
        lastSended: {
          $ifNull: [
            {
              $first: {
                $sortArray: {
                  input: {
                    $filter: {
                      input: '$responses',
                      cond: { $ne: ['$$this.sender', new ObjectId(userId)] },
                    },
                  },
                  sortBy: {
                    sendedAt: -1,
                  },
                },
              },
            },
            '$$ROOT',
          ],
        },
      },
    },
    {
      $set: {
        lastMessage: {
          $ifNull: [
            {
              $first: {
                $sortArray: {
                  input: '$responses',
                  sortBy: {
                    createdAt: -1,
                  },
                },
              },
            },
            '$$ROOT',
          ],
        },
      },
    },
    {
      $sort: {
        'lastMessage.createdAt': -1,
      },
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.MESSAGE_RECIPIENTS,
        localField: 'lastSended._id',
        foreignField: 'message',
        as: 'messageRecipients',
      },
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.USER,
        localField: 'lastSended.sender',
        foreignField: '_id',
        as: 'senderDoc',
      },
    },
    {
      $unwind: '$senderDoc',
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.USER,
        localField: 'messageRecipients.recipient',
        foreignField: '_id',
        as: 'recipients',
      },
    },
    {
      $project: {
        _id: '$lastSended._id',
        parent: {
          $first: {
            $filter: {
              input: '$responses',
              cond: { $eq: ['$$this.responseTo', null] },
            },
          },
        },
        totalExchangedMessages: { $add: [{ $size: '$responses' }, 1] },
        sender: {
          _id: '$senderDoc._id',
          firstName: '$senderDoc.firstName',
          lastName: '$senderDoc.lastName',
          email: '$senderDoc.email',
          profilePicture: {
            name: '$senderDoc.profilePicture.name',
            url: '$senderDoc.profilePicture.url',
          },
        },
        isArchived: '$isArchived',
        isDeleted: '$isDeleted',
        isRead: '$isDeleted',
        subject: '$lastSended.subject',
        content: '$lastSended.content',
        recipients: {
          $map: {
            input: '$recipients',
            as: 'recipient',
            in: {
              _id: '$$recipient._id',
              firstName: '$$recipient.firstName',
              lastName: '$$recipient.lastName',
              email: '$$recipient.email',
              profilePicture: {
                name: '$$recipient.profilePicture.name',
                url: '$$recipient.profilePicture.url',
              },
            },
          },
        },
        attachments: {
          $map: {
            input: '$lastSended.attachments',
            as: 'attachment',
            in: {
              name: '$$attachment.name',
              url: '$$attachment.url',
            },
          },
        },
        sendedAt: '$lastSended.sendedAt',
      },
    },
    {
      $group: {
        _id: '$_id',
        parentId: { $first: '$parent._id' },
        totalExchangedMessages: { $first: '$totalExchangedMessages' },
        sender: { $first: '$sender' },
        isArchived: { $first: '$isArchived' },
        isDeleted: { $first: '$isDeleted' },
        isRead: { $first: '$isRead' },
        subject: { $first: '$subject' },
        content: { $first: '$content' },
        recipients: { $first: '$recipients' },
        attachments: { $first: '$attachments' },
        sendedAt: { $first: '$sendedAt' },
      },
    },
  ];

  if (limit) pipeline.push({ $skip: page * limit }, { $limit: limit });
  // TODO: add search option
  return MessageRecipientsModel.aggregate(pipeline);
}

export async function getDraft({ userId, search, limit, page }) {
  const pipeline = [
    {
      $match: {
        sender: new ObjectId(userId),
        status: STATUS.DRAFT,
      },
    },
  ];

  if (limit) pipeline.push({ $skip: page * limit }, { $limit: limit });

  return MessageModel.aggregate(pipeline);
}

export async function getArchived({ userId, search, limit, page }) {
  const pipeline = [
    {
      $match: {
        isDeleted: false,
        status: STATUS.SENDED,
      },
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.MESSAGE_RECIPIENTS,
        localField: '_id',
        foreignField: 'message',
        as: 'messageRecipients',
      },
    },
    { $unwind: '$messageRecipients' },
    {
      $match: {
        $or: [
          {
            // $and: [{ sender: new ObjectId(userId) }, { isArchived: true }]
            sender: new ObjectId(userId),
          },
          {
            'messageRecipients.recipient': new ObjectId(userId),
            // $and: [
            //   {
            //     'messageRecipients.recipient': new ObjectId(userId),
            //     'messageRecipients.isArchived': true,
            //   },
            // ],
          },
        ],
      },
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.USER,
        localField: 'messageRecipients.recipient',
        foreignField: '_id',
        as: 'recipient',
      },
    },
    {
      $unwind: '$recipient',
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.USER,
        localField: 'sender',
        foreignField: '_id',
        as: 'senderDoc',
      },
    },
    {
      $unwind: '$senderDoc',
    },
    {
      $project: {
        sender: {
          _id: '$senderDoc._id',
          firstName: '$senderDoc.firstName',
          lastName: '$senderDoc.lastName',
          email: '$senderDoc.email',
          profilePicture: {
            name: '$senderDoc.profilePicture.name',
            url: '$senderDoc.profilePicture.url',
          },
        },
        isArchived: {
          $cond: {
            if: { $eq: ['$sender', new ObjectId(userId)] },
            then: '$isArchived',
            else: '$messageRecipients.isArchived',
          },
        },
        isDeleted: {
          $cond: {
            if: { $eq: ['$sender', new ObjectId(userId)] },
            then: '$isDeleted',
            else: '$messageRecipients.isDeleted',
          },
        },
        isRead: {
          $cond: {
            if: { $eq: ['$sender', new ObjectId(userId)] },
            then: null,
            else: '$messageRecipients.isRead',
          },
        },
        subject: '$subject',
        content: '$content',
        recipients: {
          _id: '$recipient._id',
          firstName: '$recipient.firstName',
          lastName: '$recipient.lastName',
          email: '$recipient.email',
          profilePicture: {
            name: '$recipient.profilePicture.name',
            url: '$recipient.profilePicture.url',
          },
        },
        attachments: {
          $map: {
            input: '$attachments',
            as: 'attachment',
            in: {
              name: '$$attachment.name',
              url: '$$attachment.url',
            },
          },
        },
        sendedAt: '$sendedAt',
      },
    },
    {
      $group: {
        _id: '$_id',
        sender: { $first: '$sender' },
        isArchived: { $first: '$isArchived' },
        isDeleted: { $first: '$isDeleted' },
        isRead: { $first: '$isRead' },
        subject: { $first: '$subject' },
        content: { $first: '$content' },
        recipients: { $push: '$recipients' },
        attachments: { $first: '$attachments' },
        sendedAt: { $first: '$sendedAt' },
      },
    },
  ];

  if (limit) pipeline.push({ $skip: page * limit }, { $limit: limit });

  return MessageModel.aggregate(pipeline);
}

export async function saveDraft(inputData) {
  const foundSender = await UserModel.findById(inputData.sender).lean().exec();
  if (!foundSender) throw new NotFoundError('Message sender not found');

  if (inputData.responseTo) {
    const messageToRespond = await MessageModel.findOne({
      _id: inputData.responseTo,
      status: STATUS.SENDED,
    })
      .populate('sender')
      .lean()
      .exec();
    if (!messageToRespond) throw new NotFoundError('Message to respond not found');

    inputData.recipientsStr = messageToRespond.sender.email;
    // TODO: check if the sender is in the recipient list of the messageToRespond
  }

  return MessageModel.create(inputData);
}

export function getByParentId(parentId) {
  return MessageModel.findById(parentId).populate('sender').lean().exec();
  // return MessageModel.aggregate([
  //   { $match: { _id: new ObjectId(parentId), status: STATUS.SENDED, responseTo: null } },
  //   {
  //     $graphLookup: {
  //       from: COLLECTION_NAMES.MESSAGE,
  //       startWith: '$_id',
  //       connectFromField: '_id',
  //       connectToField: 'responseTo',
  //       depthField: 'level',
  //       as: 'responses',
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: '$responses',
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   { $sort: { 'responses.level': -1 } },
  //   {
  //     $group: {
  //       _id: '$_id',
  //       responseTo: { $first: '$responseTo' },
  //       sender: { $first: '$sender' },
  //       subject: { $first: '$subject' },
  //       content: { $first: '$content' },
  //       sendedAt: { $first: '$sendedAt' },
  //       recipientsStr: { $first: '$recipientsStr' },
  //       responses: { $push: '$responses' },
  //     },
  //   },
  //   {
  //     $addFields: {
  //       responses: {
  //         $reduce: {
  //           input: '$responses',
  //           initialValue: { level: -1, presentChild: [], prevChild: [] },
  //           in: {
  //             $let: {
  //               vars: {
  //                 prev: {
  //                   $cond: [
  //                     { $eq: ['$$value.level', '$$this.level'] },
  //                     '$$value.prevChild',
  //                     '$$value.presentChild',
  //                   ],
  //                 },
  //                 current: {
  //                   $cond: [{ $eq: ['$$value.level', '$$this.level'] }, '$$value.presentChild', []],
  //                 },
  //               },
  //               in: {
  //                 level: '$$this.level',
  //                 prevChild: '$$prev',
  //                 presentChild: {
  //                   $concatArrays: [
  //                     '$$current',
  //                     [
  //                       {
  //                         $mergeObjects: [
  //                           '$$this',
  //                           // {
  //                           //   _id: '$$this._id',
  //                           //   sender: '$$this.sender',
  //                           //   responseTo: '$$this.responseTo',
  //                           // },
  //                           {
  //                             responses: {
  //                               $filter: {
  //                                 input: '$$prev',
  //                                 as: 'e',
  //                                 cond: { $eq: ['$$e.responseTo', '$$this._id'] },
  //                               },
  //                             },
  //                           },
  //                         ],
  //                       },
  //                     ],
  //                   ],
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  //   { $addFields: { responses: '$responses.presentChild' } },
  // ]);
}
export async function getDraftById(_id) {
  const foundDraft = await MessageModel.findOne({ _id, status: STATUS.DRAFT }).lean().exec();
  if (!foundDraft) throw new NotFoundError('Message not found');

  return foundDraft;
}
export async function getArchivedById(_id) {
  const foundArchivedList = await MessageModel.aggregate([
    {
      $match: {
        _id: new ObjectId(_id),
        status: STATUS.SENDED,
        isArchived: true,
      },
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.MESSAGE_RECIPIENTS,
        localField: '_id',
        foreignField: 'message',
        as: 'messageRecipients',
      },
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.USER,
        localField: 'sender',
        foreignField: '_id',
        as: 'senderDoc',
      },
    },
    {
      $unwind: '$senderDoc',
    },
    {
      $lookup: {
        from: COLLECTION_NAMES.USER,
        localField: 'messageRecipients.recipient',
        foreignField: '_id',
        as: 'recipients',
      },
    },
    {
      $project: {
        _id: '$_id',
        sender: {
          _id: '$senderDoc._id',
          firstName: '$senderDoc.firstName',
          lastName: '$senderDoc.lastName',
          email: '$senderDoc.email',
          profilePicture: {
            name: '$senderDoc.profilePicture.name',
            url: '$senderDoc.profilePicture.url',
          },
        },
        subject: '$subject',
        content: '$content',
        recipients: {
          $map: {
            input: '$recipients',
            as: 'recipient',
            in: {
              _id: '$$recipient._id',
              firstName: '$$recipient.firstName',
              lastName: '$$recipient.lastName',
              email: '$$recipient.email',
              profilePicture: {
                name: '$$recipient.profilePicture.name',
                url: '$$recipient.profilePicture.url',
              },
            },
          },
        },
        attachments: {
          $map: {
            input: '$attachments',
            as: 'attachment',
            in: {
              name: '$$attachment.name',
              url: '$$attachment.url',
            },
          },
        },
        sendedAt: '$sendedAt',
      },
    },
  ]);
  if (!foundArchivedList?.[0]) throw new NotFoundError('Message not found');

  return foundArchivedList?.[0];
}

export async function uploadAttachment({ _id, attachment }) {
  const foundMessage = await MessageModel.findOne({ _id, status: STATUS.DRAFT }).exec();
  if (!foundMessage) throw new NotFoundError('Message not found');

  foundMessage.attachments.push(attachment);
  await foundMessage.save();

  return foundMessage.attachments.at(-1);
}

async function deleteAttachmentsFromS3(foundMessageAttachments, inputAttachments) {
  const currAttachmentKeys = inputAttachments?.map(({ key }) => key);
  const attachmentsToDelete = foundMessageAttachments.filter(
    ({ key }) => !currAttachmentKeys?.includes(key),
  );

  await awsS3.deleteFiles(attachmentsToDelete.map(({ key }) => key));
}

export async function send({ _id, inputData }) {
  const foundMessage = await MessageModel.findOne({ _id, status: STATUS.DRAFT }).exec();
  if (!foundMessage) throw new NotFoundError('Message not found');

  if (foundMessage.status !== STATUS.DRAFT) throw new ForbiddenError('Message already sended');

  const recipientEmails = inputData.recipientsStr.split(/[,;/ ]+/);
  const recipients = await UserModel.find({ email: { $in: recipientEmails } })
    .lean()
    .exec();
  if (!recipients?.length) throw new NotFoundError('No recipient found');

  await deleteAttachmentsFromS3(foundMessage.attachments, inputData.attachments);

  const messageRecipientsData = recipients.map((recipient) => ({
    recipient: recipient._id,
    message: foundMessage._id,
  }));
  await MessageRecipientsModel.insertMany(messageRecipientsData);

  return foundMessage.set({ ...inputData, status: STATUS.SENDED, sendedAt: Date.now() }).save();
}

export async function updateDraft({ _id, inputData }) {
  const foundMessage = await MessageModel.findOne({ _id, status: STATUS.DRAFT }).exec();
  if (!foundMessage) throw new NotFoundError('Message not found');

  await deleteAttachmentsFromS3(foundMessage.attachments, inputData.attachments);

  return foundMessage.set(inputData).save();
}

export async function toggleState({ _id, userId, state }) {
  const foundMessage = await MessageModel.findById(_id).exec();
  if (!foundMessage) throw new NotFoundError('Message not found');

  if (state === 'read') {
    const messageRecipient = await MessageRecipientsModel.findOne({
      recipient: userId,
      message: _id,
    }).exec();

    if (messageRecipient && !messageRecipient.isRead) {
      await messageRecipient.set({ isRead: true }).save();
    }
  }

  const stateToField = {
    archive: 'isArchived',
    favorite: 'isFavorite',
  };
  const field = stateToField[state];
  foundMessage[field] = !foundMessage[field];

  await foundMessage.set({ [field]: !foundMessage[field] }).save();
}

export async function destroy(_id) {
  const foundMessage = await MessageModel.findById(_id).exec();
  if (!foundMessage) throw new NotFoundError('Message not found');

  if (foundMessage.status === STATUS.DRAFT) return foundMessage.deleteOne();

  foundMessage.isDeleted = true;
  return foundMessage.save();
}
