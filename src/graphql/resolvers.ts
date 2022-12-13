import * as registerService from "../database/services/register.service";
import {
  CreateRegisterDTO,
  RegisterResponseDTO,
} from "../database/services/dtos/register.dto";
import { IRegister } from "../database/models/register.model";
import { validateRegisterData } from "../validators/register.validator";
import { InputValidatorError } from "./error";

export = {
  createRegister: async ({
    input,
  }: any): Promise<RegisterResponseDTO | undefined> => {
    const registerData: CreateRegisterDTO = {
      userId: input.userId,
      username: input.username,
      email: input.email,
      walletAddress: input.walletAddress,
    };

    const { error, value } = validateRegisterData(registerData);

    if (error) {
      throw new InputValidatorError(error.message, 403, "createRegister");
    }

    return await registerService._create(value!);
  },

  getAllRegister: async (): Promise<IRegister[]> => {
    const allRegister = await registerService._findAll();
    return allRegister;
  },

  getRegisterByUserId: async ({ userId }: any): Promise<IRegister> => {
    const member = await registerService._findOne(userId);
    return member;
  },
};
