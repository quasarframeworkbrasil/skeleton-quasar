// import { primaryKey } from 'src/settings/schema'

import { SCOPES } from 'src/app/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Usuários'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Usuários'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Lixeira dos Usuários',
      crumb: 'Lixeira'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Criar Usuário',
      crumb: 'Criar'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'Visualizar Usuário',
      crumb: 'Visualizar'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Editar Usuário',
      crumb: 'Editar'
    }
  },
  print: {
    title: 'Impressão de Usuário'
  },
  fields: {
    // [primaryKey]: 'Id',
    integration: 'API Key',
    name: 'Nome',
    profile: 'Perfil',
    email: 'Email',
    phone: 'Celular',
    active: {
      label: 'Ativo',
      inline: 'Permitir acesso'
    },
    password: 'Senha',
    confirmPassword: 'Confirmação da Senha'
  }
}
