export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  areas: string[];
  description: string;
  hourlyRate: number;
}

export interface CoachesState {
  coaches: Coach[];
  lastFetch: null | number;
}

export interface NewCoachFormData {
  firstName: string;
  lastName: string;
  description: string;
  rate: number;
  areas: string[];
}
