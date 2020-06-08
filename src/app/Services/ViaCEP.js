import { replacement } from 'src/app/Util/string'

/**
 * @link https://viacep.com.br
 *
 * @type {ViaCEP}
 */
export default class ViaCEP {
  /**
   * @var {string}
   */
  uri = 'https://viacep.com.br/ws/{cep}/json?callback=callbackViaCEP'

  /**
   * @returns {ViaCEP}
   */
  static build () {
    return new this()
  }

  /**
   * @param {string} cep
   */
  query (cep) {
    return new Promise((resolve) => {
      window.callbackViaCEP = function (response) {
        /*
         {
          "cep": "",
          "logradouro": "",
          "complemento": "",
          "bairro": "",
          "localidade": "",
          "uf": "",
          "unidade": "",
          "ibge": "",
          "gia": ""
        }
        */
        resolve({
          zip: response['cep'],
          address: response['logradouro'],
          complement: response['complemento'],
          neighborhood: response['bairro'],
          city: response['localidade'],
          state: response['uf'],
          ibge: response['ibge'],
          gia: response['gia']
        })
      }
      const request = document.createElement('script')
      request.src = replacement(this.uri, { cep })
      document.body.appendChild(request)
    })
  }
}
