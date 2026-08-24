import { Routes, Route } from 'react-router';
import { MainLayout } from '@/components/layout';
import { Home, About, Post, NotFound } from '@/pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/posts/:id" element={<Post />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
