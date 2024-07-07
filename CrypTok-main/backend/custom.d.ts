import { Request } from "express"
import * as admin from 'firebase-admin';
export interface IGetUserAuthInfoRequest extends Request {
  user: admin.auth.DecodedIdToken // or any other type
}