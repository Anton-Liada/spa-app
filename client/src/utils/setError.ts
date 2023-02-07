import { ErrorMessage, Status } from "../types/enums";
import { ISetError } from "../types/types";

export const setError = (state: ISetError): void => {
  state.status = Status.FAILED;
  state.error = ErrorMessage.ERROR;
};