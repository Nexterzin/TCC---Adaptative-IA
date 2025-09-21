'use client'

import dynamic from 'next/dynamic';

const ResetPasswordForm = dynamic(() => import('./ResetPasswordForm'), {
  ssr: false, // Isso desativa a renderização no servidor para este componente
  loading: () => <Loading />, // Você pode usar seu componente de loading aqui
});

const ResetPasswordPage = () => {
  return (
    <ResetPasswordForm />
  )
}

export default ResetPasswordPage