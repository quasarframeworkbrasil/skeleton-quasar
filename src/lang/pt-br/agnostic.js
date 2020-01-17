import { primaryKey } from 'src/settings/schema'

export default {
  /**
   * @type {Object}
   */
  scope: {
  },
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
    create: {
      label: 'Salvar',
      success: 'Registro criado com sucesso',
      fail: 'Opa, não foi possível realizar a operação',
      validation: 'Verifique os campos destacados',
      tooltip: 'Cria um novo registro'
    },
    update: {
      label: 'Salvar',
      success: 'Registro atualizado com sucesso',
      fail: 'Opa, não foi possível realizar a operação',
      validation: 'Verifique os campos destacados',
      tooltip: 'Atualiza um registro'
    },
    reset: {
      label: 'Limpar',
      tooltip: ''
    },
    add: {
      label: 'Novo',
      tooltip: 'Abre a tela de criação de um novo registro'
    },
    trash: {
      label: 'Lixeira',
      tooltip: 'Abre a lixeira para a recuperação de um registro'
    },
    edit: {
      label: 'Editar',
      tooManySelected: 'Esta operação não pode ser feita para vários registros',
      noItems: 'Esta operação precisa de um item selecionado ou um contexto',
      tooltip: 'Abre a tela de alteração de um registro'
    },
    destroy: {
      label: 'Apagar',
      success: 'Registro(s) removido(s) com sucesso',
      confirm: 'Deseja apagar este(s) registro(s)?',
      noItems: 'Esta operação precisa de um item selecionado ou um contexto',
      fail: 'Whoops, não foi possível realizar a operação',
      tooltip: 'Remove um registro'
    },
    restore: {
      label: 'Restaurar',
      success: 'Registro(s) restaurado(s) com sucesso',
      confirm: 'Deseja restaurar este(s) registro(s)?',
      noItems: 'Esta operação precisa de um item selecionado ou um contexto',
      fail: 'Whoops, não foi possível realizar a operação',
      tooltip: 'Restaura um registro que estava na lixeira'
    },
    view: {
      label: 'Visualizar',
      tooManySelected: 'Esta operação não pode ser feita para vários registros',
      noItems: 'Esta operação precisa de um item selecionado ou um contexto',
      tooltip: 'Abre a tela de visualização de um registro'
    },
    home: {
      label: 'Listagem',
      tooltip: 'Volta para a lista principal'
    },
    back: {
      label: 'Voltar',
      tooltip: 'Volta para a tela anterior'
    },
    print: {
      label: 'Impressão',
      tooltip: 'Visualiza a impressão do conteúdo desta página'
    },
    refresh: {
      label: 'Atualizar',
      tooltip: 'Atualiza os registros carregados na tela'
    },
    'sort-clear': {
      noSort: 'A ordenação não está ativa para ser reiniciada',
      tooltip: 'Remove a ordenação aplicada à tela'
    },
    search: {
      label: 'Pesquisar',
      tooltip: 'Pesquisa pelos valores informados no formulário'
    },
    'search-clear': {
      label: 'Limpar',
      tooltip: 'Limpa todos os filtros aplicados'
    }
  }
}
