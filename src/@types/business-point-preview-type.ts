import { BusinessPointStatus } from "@/enums/business-point-status";

export type BusinessPointPreviewType = {
  id: string;
  name: string;
  status: BusinessPointStatus;
  awaitingApproval: boolean;
  hasPendingDraft: boolean;
  createdAt: Date;
  updatedAt: Date;
};
