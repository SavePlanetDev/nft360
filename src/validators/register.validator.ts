import Joi, { ValidationError, ValidationResult } from "joi";
import { CreateRegisterDTO } from "../database/services/dtos/register.dto";

const schema = Joi.object({
  userId: Joi.string(),
  username: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  walletAddress: Joi.string().pattern(new RegExp("^0x[a-fA-F0-9]{40}$")),
});

export const validateRegisterData = (
  input: CreateRegisterDTO
): ValidationResult<CreateRegisterDTO> => {
  return schema.validate(input);
};
