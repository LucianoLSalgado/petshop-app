import { Outlet, Link } from 'react-router';

export function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white">
        <div className="container-custom h-16 flex items-center justify-between">
          <Link to="/admin" className="font-logo text-xl">
            PetShop Admin
          </Link>
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
