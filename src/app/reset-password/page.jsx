import dynamic from 'next/dynamic';
import Loading from '../Commons/Component/Loading/loading';

// Carrega o ResetPasswordForm apenas no cliente
const ResetPasswordForm = dynamic(() => import('./ResetPasswordForm'), {
  ssr: false, // Isso desativa o Server-Side Rendering
  loading: () => <Loading />, // Mostra o loading enquanto o componente é carregado
});

const ResetPasswordPage = () => {
  return (
    <ResetPasswordForm />
  );
};

export default ResetPasswordPage;