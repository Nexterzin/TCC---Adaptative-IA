// src/app/reset-password/page.jsx
'use client'

import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import Loading from '../Commons/Component/Loading/loading';

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;