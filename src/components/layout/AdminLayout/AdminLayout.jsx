import { Suspense } from 'react';
import { Outlet, Link, NavLink } from 'react-router';
import { clsx } from 'clsx';
import { Button } from '@/components/ui';
import { useAuth, useLogout } from '@/hooks';

const navItems = [
  { label: 'Categorias', to: '/admin', end: true },
  { label: 'Posts', to: '/admin/posts', end: false },
];

export function AdminLayout() {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white">
        <div className="container-custom h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/admin" className="font-logo text-xl">
              PetShop Admin
            </Link>

            <nav className="flex gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    clsx(
                      'text-sm transition-colors',
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-gray-300 hover:text-white'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-gray-300">
              {user?.email}
            </span>
            <Link to="/" className="text-sm text-gray-300 hover:text-white">
              Voltar ao site
            </Link>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => logout.mutate()}
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container-custom">
          <Suspense fallback={<p className="text-gray-600">Carregando...</p>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
