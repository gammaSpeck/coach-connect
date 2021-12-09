export interface IRequest {
  id: string;
  coachId: string;
  userEmail: string;
  message: string;
}

export interface ContactCoachParams {
  coachId: string;
  email: string;
  message: string;
}

export interface RequestsState {
  requests: IRequest[];
}
