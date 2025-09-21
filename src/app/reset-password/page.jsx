'use client'

import dynamic from 'next/dynamic'
import Loading from '../Commons/Component/Loading/loading'

const ResetPasswordForm = dynamic(() => import('./ResetPasswordForm'), {
  ssr: false, 
  loading: () => <Loading />, 
});

const ResetPasswordPage = () => {
  return (
    <ResetPasswordForm />
  )
}

export default ResetPasswordPage