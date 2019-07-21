import {Id} from '../../../common/types/types';
import {Debt} from './debt';
import {InstanceType, Ref} from 'typegoose';
import {ObjectId} from '../../../common/classes/object-id';
import {User} from '../../users/models/user';

export class DebtsHelper {

  static getAnotherDebtUserId(debt: InstanceType<Debt>, userId: Id): Ref<User> {
    return debt.users.find(uId => (uId as ObjectId).toString() !== userId.toString());
  }

  static getAnotherDebtUserModel(debt: InstanceType<Debt>, userId: Id): InstanceType<User> {
    return debt.users.find(uId => (uId as InstanceType<User>)._id.toString() !== userId.toString()) as InstanceType<User>;
  }

  static getCurrentDebtUserModel(debt: InstanceType<Debt>, userId: Id): InstanceType<User> {
    return debt.users.find(uId => (uId as InstanceType<User>)._id.toString() === userId.toString()) as InstanceType<User>;
  }

}
