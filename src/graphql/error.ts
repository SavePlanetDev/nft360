import { GraphQLError, GraphQLErrorExtensions } from "graphql";

export class InputValidatorError extends GraphQLError {
  extensions: GraphQLErrorExtensions;
  constructor(message: string, code: number, functionCall: string) {
    super(message);
    this.extensions = {
      code,
      functionCall,
    };
  }
}
