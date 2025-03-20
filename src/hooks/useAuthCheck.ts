import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { verifyAuth } from '../state/authStore';
import { AppDispatch, RootState } from '../state/uiStore';

export function useAuthCheck(requireAuth: boolean = true) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        navigate('/login');
      } else if (!requireAuth && isAuthenticated) {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, navigate, requireAuth]);

  return { isAuthenticated, isLoading };
}