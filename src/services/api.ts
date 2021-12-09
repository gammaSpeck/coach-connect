import { Coach, IRequest } from "@/interfaces";

export const BASE_FIREBASE_URL = process.env.VUE_APP_BASE_FIREBASE_URL as string;

export const Api = {
  async registerNewCoach({ id, ...rest }: Coach, token: string) {
    const res = await fetch(`${BASE_FIREBASE_URL}/coaches/${id}.json?auth=${token}`, {
      method: "PUT",
      body: JSON.stringify(rest)
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to Register new coach");
    return data;
  },

  async listAllCoaches(): Promise<Coach[]> {
    const res = await fetch(`${BASE_FIREBASE_URL}/coaches.json`);

    if (!res.ok) throw new Error("Failed to Fetch coaches");

    const data = (await res.json()) as Record<string, Omit<Coach, "id">>;
    const coaches = Object.entries(data).map(([id, v]) => ({
      id,
      ...v
    }));

    return coaches;
  },

  async addNewContactRequest({
    coachId,
    ...rest
  }: Omit<IRequest, "id">): Promise<{ name: string }> {
    const res = await fetch(`${BASE_FIREBASE_URL}/requests/${coachId}.json`, {
      method: "POST",
      body: JSON.stringify(rest)
    });

    if (!res.ok) throw new Error("Failed to add new request");

    const data = await res.json();
    return data;
  },

  async listAllContactRequests(coachId: string, token: string): Promise<IRequest[]> {
    const res = await fetch(`${BASE_FIREBASE_URL}/requests/${coachId}.json?auth=${token}`);
    if (!res.ok) throw new Error("Failed to Fetch contact requests");

    const data = (await res.json()) as null | Record<string, Omit<IRequest, "id" | "coachId">>;

    if (!data) return [];

    const requests: IRequest[] = Object.entries(data).map(([id, v]) => ({
      id,
      coachId,
      ...v
    }));

    return requests;
  }
};
