import { Status } from "../types/enums";
import { ISetStatus } from "../types/types";

export const setStatus = (state: ISetStatus): void => {
  state.status = Status.LOADING;
};