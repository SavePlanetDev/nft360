import AppError from "../../utils/AppError";
import { dbRegisters } from "../database";
import { IRegister } from "../models/register.model";
import { CreateRegisterDTO, RegisterResponseDTO } from "./dtos/register.dto";

async function _create(registerData: CreateRegisterDTO) {
  const ref = dbRegisters.doc(registerData.userId);
  const doc = await ref.get();
  if (!doc.exists) {
    await ref.set(registerData);
    return {
      userId: registerData.userId,
      result: true,
      msg: `userId: ${registerData.userId}, successfully registered!`,
    } as RegisterResponseDTO;
  } else {
    return {
      userId: registerData.userId,
      result: false,
      msg: `userId: ${registerData.userId}, is existed!`,
    } as RegisterResponseDTO;
  }
}

async function _findAll(): Promise<IRegister[]> {
  const snapshots = await dbRegisters.get();
  const data = snapshots.docs.map((doc) => {
    return {
      userId: doc.id,
      ...doc.data(),
    } as IRegister;
  });

  return data.length <= 0 ? [] : data;
}

async function _findOne(userId: string): Promise<IRegister> {
  const result = await dbRegisters.doc(userId).get();
  return { userId: result.id, ...result.data() } as IRegister;
}

async function _update(userId: string, data: Partial<IRegister>) {}

async function _delete(userId: string) {}

export { _create, _findAll, _findOne, _update, _delete };
