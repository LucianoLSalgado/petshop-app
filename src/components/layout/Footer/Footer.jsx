export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container-custom py-6">
        <p className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} PetShop. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
