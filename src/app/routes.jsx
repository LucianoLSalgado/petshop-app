import { Routes, Route } from 'react-router';
import { MainLayout, AdminLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/auth';
import {
  Home,
  About,
  Post,
  Category,
  AdminCategories,
  CategoryForm,
  AdminPosts,
  PostForm,
  Login,
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

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminCategories />} />
          <Route path="categorias/nova" element={<CategoryForm />} />
          <Route
            path="categorias/:categoryId/editar"
            element={<CategoryForm />}
          />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="posts/novo" element={<PostForm />} />
          <Route path="posts/:postId/editar" element={<PostForm />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
