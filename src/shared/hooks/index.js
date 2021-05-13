import { useState, useCallback } from 'react';

export const useMergeState = (initState = {}) => {
  const [state, setState] = useState(initState);
  const mergeState = useCallback(merge => {
    setState(oldState => ({ ...oldState, ...merge }))
  }, []);
  return [state, mergeState];
};