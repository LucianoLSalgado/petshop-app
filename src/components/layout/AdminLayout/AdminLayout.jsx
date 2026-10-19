import { Outlet, Link, NavLink } from 'react-router';
import { clsx } from 'clsx';

const navItems = [
  { label: 'Categorias', to: '/admin', end: true },
  { label: 'Posts', to: '/admin/posts', end: false },
];

export function AdminLayout() {
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

          <Link to="/" className="text-sm text-gray-300 hover:text-white">
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container-custom">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
