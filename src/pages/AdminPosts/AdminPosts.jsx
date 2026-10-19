import { DataGrid } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { Button } from '@/components/ui';
import { usePosts, useDeletePost } from '@/hooks';

const localeText = ptBR.components.MuiDataGrid.defaultProps.localeText;

export function AdminPosts() {
  const { data: posts, isPending, isError } = usePosts();
  const deletePost = useDeletePost();

  const handleDelete = (post) => {
    const confirmed = window.confirm(
      `Excluir o post "${post.title}"? Essa ação não pode ser desfeita.`
    );

    if (confirmed) {
      deletePost.mutate(post.id);
    }
  };

  const columns = [
    { field: 'title', headerName: 'Título', flex: 1, minWidth: 220 },
    { field: 'category', headerName: 'Categoria', width: 160 },
    { field: 'subcategory', headerName: 'Subcategoria', width: 160 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(params.row)}
        >
          Excluir
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Posts</h1>

      {isError && (
        <p className="text-red-600 mb-4">Não foi possível carregar os posts.</p>
      )}

      <div className="h-[520px] bg-white rounded-lg">
        <DataGrid
          rows={posts ?? []}
          columns={columns}
          loading={isPending}
          showToolbar
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          disableRowSelectionOnClick
          localeText={localeText}
          className="border-0"
        />
      </div>
    </div>
  );
}
