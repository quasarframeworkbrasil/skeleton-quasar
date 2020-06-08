/**
 */
export default {
  routes: {
    report: {
      title: 'Relatório de Estoque Atual',
      crumb: 'Estoque Atual'
    }
  },
  fields: {
    user: 'Usuário',
    profile: 'Perfil de Usuário',
    notes: 'Detalhes',
    restrict: {
      label: 'Apenas Materiais Movimentados',
      info: 'Marcando esse campo serão exibidos apenas os materiais que movimentaram o "Centro de Estoque" selecionado'
    }
  }
}
