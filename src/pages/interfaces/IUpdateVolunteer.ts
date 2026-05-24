import type { ICreateVolunteerInput } from "./ICreateVolunteerInput";

export interface IUpdateVolunteer extends ICreateVolunteerInput {
  status: boolean;
}
