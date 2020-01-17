// import { primaryKey } from 'src/settings/schema'

import { SCOPES } from 'src/app/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Filmes'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Filmes'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Lixeira de Filmes',
      crumb: 'Lixeira'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Criar Filme',
      crumb: 'Criar'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'Visualizar Filme',
      crumb: 'Visualizar'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Editar Filme',
      crumb: 'Editar'
    }
  },
  form: {
    title: ''
  },
  table: {
    title: ''
  },
  fields: {
    // [primaryKey]: 'Id',
    name: 'Nome',
    description: 'Descrição'
  }
}
