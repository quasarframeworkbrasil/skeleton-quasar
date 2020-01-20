import { SCOPES } from 'src/app/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Categorias'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Categorias'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Lixeira das Categorias',
      crumb: 'Lixeira'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Criar Categoria',
      crumb: 'Criar'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'Visualizar Categoria',
      crumb: 'Visualizar'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Editar Categoria',
      crumb: 'Editar'
    }
  },
  print: {
    title: 'Impressão de Categoria'
  },
  fields: {
    name: 'Nome'
  }
}
