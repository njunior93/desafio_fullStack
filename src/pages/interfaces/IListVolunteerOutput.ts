import type { ICreateVolunteerInput } from "./ICreateVolunteerInput";

export interface IlistVolunteerOutput extends ICreateVolunteerInput {
  id:number;
  status: boolean;
  data_inscricao: string;
}