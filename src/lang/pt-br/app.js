// the app built-in texts
export default {
  components: {},
  version: {
    notify: `Uma nova versão está disponível!` +
      ` A sua versão atual é a {version} e a nova é a {new}.` +
      ` Deseja aplicar a atualização agora?`
  },
  greetings: {
    morning: 'Bom dia',
    afternoon: 'Boa tarde',
    night: 'Boa noite'
  },
  menu: {
    logout: {
      label: 'Sair',
      caption: 'Finaliza a sessão atual e redireciona para a tela inicial'
    },
    profile: {
      label: 'Minha Conta',
      caption: 'Exibe e administra os dados do usuário conectado'
    }
  },
  http: {
    noNetwork: 'Este recurso não está disponível quando não há internet no dispositivo'
  }
}
