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
  const result = await MessageModel.aggregate([
    {
      $match: {
        isDeleted: false,
        isArchived: false,
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
        subject: '$subject',
        content: '$content',
        recipients: {
          $map: {
            input: '$recipients',
            as: 'recipient',
            in: {
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
        attchments: {
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
    // {
    //   $unwind: '$course',
    // },
    // {
    //   $lookup: {
    //     from: COLLECTION_NAMES.CHAPTER,
    //     localField: 'course._id',
    //     foreignField: 'course',
    //     as: 'chapters',
    //   },
    // },
    // {
    //   $unwind: '$chapters',
    // },
    // {
    //   $lookup: {
    //     from: COLLECTION_NAMES.VIDEO,
    //     localField: 'chapters._id',
    //     foreignField: 'chapter',
    //     as: 'videos',
    //   },
    // },
    // {
    //   $unwind: {
    //     path: '$videos',
    //   },
    // },
    // {
    //   $lookup: {
    //     from: COLLECTION_NAMES.USER_PROGRESS,
    //     let: {
    //       userId: '$user',
    //       videoId: '$videos._id',
    //     },
    //     pipeline: [
    //       {
    //         $match: {
    //           $expr: {
    //             $and: [
    //               { $eq: ['$$userId', '$user'] },
    //               { $eq: ['$$videoId', '$video'] },
    //             ],
    //           },
    //         },
    //       },
    //     ],
    //     as: 'progress',
    //   },
    // },
    // {
    //   $unwind: {
    //     path: '$progress',
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
    // {
    //   $sort: {
    //     'videos.createdAt': 1,
    //   },
    // },
    // {
    //   $group: {
    //     _id: {
    //       courseId: '$course._id',
    //       chapterId: '$chapters._id',
    //     },
    //     lastWatchedVideo: { $first: '$lastWatchedVideo' },
    //     course: { $first: '$course' },
    //     chapter: {
    //       $first: {
    //         _id: '$chapters._id',
    //         title: '$chapters.title',
    //         createdAt: '$chapters.createdAt',
    //       },
    //     },
    //     videosPerChapter: {
    //       $push: {
    //         _id: '$videos._id',
    //         title: '$videos.title',
    //         description: '$videos.description',
    //         formatedDuration: {
    //           $dateToString: {
    //             format: '%H:%M',
    //             date: {
    //               $toDate: {
    //                 $multiply: ['$videos.duration', 1000], // Convert seconds to milliseconds
    //               },
    //             },
    //           },
    //         },
    //         progress: { $ifNull: ['$progress.progress', 0] },
    //         isCompleted: '$progress.isCompleted',
    //       },
    //     },
    //   },
    // },
    // {
    //   $sort: {
    //     'chapter.createdAt': 1,
    //   },
    // },
    // {
    //   $group: {
    //     _id: '$_id.courseId',
    //     title: { $first: '$course.title' },
    //     description: { $first: '$course.description' },
    //     lastWatchedVideo: {
    //       $first: {
    //         $ifNull: [
    //           '$lastWatchedVideo',
    //           { $arrayElemAt: ['$videosPerChapter._id', 0] },
    //         ],
    //       },
    //     },
    //     chapters: {
    //       $push: {
    //         $mergeObjects: ['$chapter', { videos: '$videosPerChapter' }],
    //       },
    //     },
    //   },
    // },
  ]);

  return result;
}

export async function getReceived({ userId, search, limit, page }) {
  return [];
}

export async function getDraft({ userId, search, limit, page }) {
  return MessageModel.aggregate([
    {
      $match: {
        sender: new ObjectId(userId),
        status: STATUS.DRAFT,
      },
    },
  ]);
}

export async function getArchived({ userId, search, limit, page }) {
  return [];
}

export async function saveDraft(inputData) {
  const foundSender = await UserModel.findById(inputData.sender).lean().exec();
  if (!foundSender) throw new NotFoundError('Message sender not found');

  if (inputData.responseTo) {
    const messageToRespond = await MessageModel.findById(inputData.responseTo).lean().exec();
    if (!messageToRespond || messageToRespond.status === STATUS.DRAFT)
      throw new NotFoundError('Message to respond not found');
  }

  return MessageModel.create(inputData);
}

export async function uploadAttachment({ _id, attachment }) {
  const foundMessage = await MessageModel.findById(_id).exec();
  if (!foundMessage) throw new NotFoundError('Message not found');

  if (foundMessage.status !== STATUS.DRAFT)
    throw new ForbiddenError('Cannot update a sended message');

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
  const foundMessage = await MessageModel.findById(_id).exec();
  if (!foundMessage) throw new NotFoundError('Message not found');

  if (foundMessage.status !== STATUS.DRAFT) throw new ForbiddenError('Message already sended');

  const recipientEmails = inputData.recipientsStr.split(/[,;/ ]+/);
  const recipients = await UserModel.find({ email: { $in: recipientEmails } })
    .lean()
    .exec();
  if (!recipients) throw NotFoundError('No recipient found');

  await deleteAttachmentsFromS3(foundMessage.attachments, inputData.attachments);

  const messageRecipientsData = recipients.map((recipient) => ({
    recipient: recipient._id,
    message: foundMessage._id,
  }));
  await MessageRecipientsModel.create(messageRecipientsData);

  return foundMessage.set({ ...inputData, status: STATUS.SENDED, sendedAt: Date.now() }).save();
}

export async function updateDraft({ _id, inputData }) {
  const foundMessage = await MessageModel.findById(_id).exec();
  if (!foundMessage) throw new NotFoundError('Message not found');

  if (foundMessage.status !== STATUS.DRAFT)
    throw new ForbiddenError('Cannot update a sended message');

  await deleteAttachmentsFromS3(foundMessage.attachments, inputData.attachments);

  return foundMessage.set(inputData).save();
}

export async function toggleState({ _id, state }) {
  const foundMessage = await MessageModel.findById(_id).exec();
  if (!foundMessage) throw new NotFoundError('Message not found');

  const stateToField = {
    archive: 'isArchived',
    favorite: 'isFavorite',
  };
  const field = stateToField[state];
  foundMessage[field] = !foundMessage[field];

  return foundMessage.save();
}

export async function destroy(_id) {
  const foundMessage = await MessageModel.findById(_id).exec();
  if (!foundMessage) throw new NotFoundError('Message not found');

  if (foundMessage.status === STATUS.DRAFT) return foundMessage.deleteOne();

  foundMessage.isDeleted = true;
  return foundMessage.save();
}
