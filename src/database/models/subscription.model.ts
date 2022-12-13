export interface ISubscription {
  userId: string;
  planId: number;
  startDate: Date;
  endDate: Date;
  status: boolean;
}
