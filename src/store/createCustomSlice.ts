import {
  createSlice,
  Draft,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

export default function createCustomSlice<
  T extends object,
  Reducers extends SliceCaseReducers<T>,
>({
  name,
  initialState,
  reducers,
}: {
  name: string;
  initialState: T;
  reducers?: ValidateSliceCaseReducers<T, Reducers>;
}) {
  const extraReducers = {
    setField: <K extends keyof T>(
      state: Draft<T>,
      action: PayloadAction<[name: K, value: T[K]]>,
    ) => {
      const [name, value] = action.payload;
      state[name as keyof Draft<T>] = value as unknown as Draft<T>[keyof Draft<T>];
    },
  };

  return createSlice({
    name,
    initialState,
    reducers: {
      ...(reducers as Reducers),
      ...extraReducers,
    } as ValidateSliceCaseReducers<T, Reducers & typeof extraReducers>,
  });
}
