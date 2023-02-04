import { Status } from "../types/enums";
import { ISetError, ISetStatus } from "../types/types";

export const setStatus = (state: ISetStatus): void => {
  state.status = Status.LOADING;
};

export const setError = (state: ISetError): void => {
  state.status = Status.FAILED;
  state.error = 'Something went wrong';
};