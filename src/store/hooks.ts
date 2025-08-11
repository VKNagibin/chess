import { bindActionCreators } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/store';

import rootActions from './rootActions';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(rootActions, dispatch);
};
