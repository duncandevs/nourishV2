import {create} from 'zustand';
import { createUserModel } from "../domains/users/model"
import { createSearchModel } from '../domains/search/model';
import { createFoodLogsModel } from '../domains/foodLog/model';

// UseBoundStore<StoreApi<unknown>>

export const useAppState = create((set, get) => ({
  ...createUserModel(set, get),
  ...createSearchModel(set, get),
  ...createFoodLogsModel(set, get),
}))
