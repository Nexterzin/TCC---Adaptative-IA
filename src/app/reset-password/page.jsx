'use client'

import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import Loading from '../Commons/Component/Loading/loading'; 

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}