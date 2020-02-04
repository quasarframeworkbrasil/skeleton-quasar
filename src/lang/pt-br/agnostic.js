import { primaryKey } from 'src/settings/schema'
import actions from 'src/lang/pt-br/actions'

export default {
  /**
   * @type {Object}
   */
  scope: {},
  table: {
    search: 'Pesquisar...',
    columns: 'Colunas'
  },
  filter: {
    select: 'Selecione o filtro corretamente'
  },
  fields: {
    [primaryKey]: 'Id',
    createdAt: 'Criado em',
    updatedAt: 'Atualizado em',
    deletedAt: 'Apagado em',
    createdBy: 'Criado por',
    updatedBy: 'Atualizado por',
    deletedBy: 'Apagado por'
  },
  components: {
    array: {
      empty: 'Use o botão {button} para adicionar mais itens'
    },
    appSelectRemote: {
      noResults: 'A coleção está vazia',
      searching: 'Pesquisando...',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      clear: 'Limpar Seleção',
      search: 'Pesquisar'
    },
    image: {
      button: 'Selecione uma imagem'
    }
  },
  dialog: {
    alert: {
      title: 'Atenção'
    },
    confirm: {
      title: 'Confirmação'
    },
    prompt: {
      title: 'Informe'
    }
  },
  options: {
    gender: {
      male: 'Masculino',
      female: 'Feminino'
    },
    yesNo: {
      yes: 'Sim',
      no: 'Não'
    }
  },
  actions: {
    ...actions,
    'md-create': actions.create,
    'md-update': actions.update,
    'md-reset': actions.reset,
    'md-add': actions.add,
    'md-trash': actions.trash,
    'md-edit': actions.edit,
    'md-destroy': actions.destroy,
    'md-restore': actions.restore,
    'md-view': actions.view,
    'md-home': actions.home,
    'md-back': actions.back,
    'md-print': actions.print,
    'md-refresh': actions.refresh,
    'md-sort-clear': actions['sort-clear'],
    'md-search': actions.search,
    'md-search-clear': actions['search-clear']
  }
}
