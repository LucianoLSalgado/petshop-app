import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, Navigate, useLocation } from 'react-router';
import { Button, Card, Input } from '@/components/ui';
import { useAuth, useLogin } from '@/hooks';

const schema = yup.object({
  email: yup
    .string()
    .required('Informe o e-mail')
    .email('Informe um e-mail válido'),
  password: yup.string().required('Informe a senha'),
});

const errorMessages = {
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/user-not-found': 'E-mail ou senha incorretos.',
  'auth/wrong-password': 'E-mail ou senha incorretos.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos.',
  'auth/network-request-failed': 'Sem conexão com a internet.',
};

export function Login() {
  const location = useLocation();
  const { user } = useAuth();
  const loginMutation = useLogin();
  const from = location.state?.from?.pathname ?? '/admin';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (user) {
    return <Navigate to={from} replace />;
  }

  const onSubmit = (formData) => {
    loginMutation.mutate(formData);
  };

  const errorMessage = loginMutation.isError
    ? (errorMessages[loginMutation.error.code] ??
      'Não foi possível entrar. Tente novamente.')
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card variant="elevated" padding="lg" className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Entrar no PetShop Admin</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="E-mail"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Senha"
            type="password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />

          {errorMessage && (
            <p role="alert" className="mb-4 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={loginMutation.isPending}
          >
            Entrar
          </Button>
        </form>

        <Link to="/" className="block mt-4 text-sm text-primary-500 underline">
          Voltar ao site
        </Link>
      </Card>
    </div>
  );
}
