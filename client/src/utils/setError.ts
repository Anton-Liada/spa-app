import { EMessages, Status } from "../types/enums";
import { ISetError } from "../types/types";

export const setError = (state: ISetError, errorMassege: EMessages): void => {
  state.status = Status.FAILED;
  state.error = errorMassege;
};