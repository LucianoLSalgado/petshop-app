import { Routes, Route } from 'react-router';
import { MainLayout, AdminLayout } from '@/components/layout';
import {
  Home,
  About,
  Post,
  Category,
  AdminCategories,
  CategoryForm,
  NotFound,
} from '@/pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/categorias/:categoryId" element={<Category />} />
        <Route
          path="/categorias/:categoryId/:subcategoryId"
          element={<Category />}
        />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminCategories />} />
        <Route path="categorias/nova" element={<CategoryForm />} />
        <Route
          path="categorias/:categoryId/editar"
          element={<CategoryForm />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
