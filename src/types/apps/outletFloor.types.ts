import { OutletFloor } from "@prisma/client";

export type OutletFloorRequest = {
  id?: number;
  outletId?: number;
  businessInfoId: number;
};

export type CreateOutletFloorRequest = Omit<OutletFloor, "id">;

export type UpdateOutletFloorRequest = {
  businessInfoId: number;
  data: Partial<OutletFloor>;
};

export type DeleteOutletFloorRequest = {
  id: number;
  businessInfoId: number;
};
