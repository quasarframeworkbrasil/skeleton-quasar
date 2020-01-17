// import { primaryKey } from 'src/settings/schema'

import { SCOPES } from 'src/app/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Ações'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Ações'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Lixeira das Ações',
      crumb: 'Lixeira'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Criar Ação',
      crumb: 'Criar'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'Visualizar Ação',
      crumb: 'Visualizar'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Editar Ação',
      crumb: 'Editar'
    }
  },
  print: {
    title: 'Impressão de Ação'
  },
  fields: {
    // [primaryKey]: 'Id',
    parent: 'Pai',
    name: 'Nome',
    namespace: 'Escopo',
    icon: 'Ícone',
    path: 'URL',
    assortment: 'Ordenação',
    separated: 'Separador'
  }
}
