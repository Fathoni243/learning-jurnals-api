import { OutletTable } from "@prisma/client";

export type OutletTableRequest = {
  id?: number;
  outletFloorId?: number;
  businessInfoId: number;
};

export type CreateOutletTableRequest = Omit<OutletTable, "id">;

export type UpdateOutletTableRequest = {
  businessInfoId: number;
  data: Partial<OutletTable>;
};

export type DeleteOutletTableRequest = {
  id: number;
  businessInfoId: number;
};
