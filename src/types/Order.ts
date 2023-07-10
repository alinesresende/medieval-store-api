export type Order = {
  id: number;
  userId: number;
  productIds?: {
    id: number 
  }[];
};
export interface OrdersReturn {
  id: number;
  userId: number;
  productIds: number[];
}