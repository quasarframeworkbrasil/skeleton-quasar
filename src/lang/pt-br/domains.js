// domains/Admin
import action from 'src/domains/Admin/Action/pt-br'
import profile from 'src/domains/Admin/Profile/pt-br'
import user from 'src/domains/Admin/User/pt-br'
// domains/Example
import movie from 'src/domains/Example/Movie/pt-br'
// domains/Help
import home from 'src/domains/Home/pt-br'

/**
 */
export default {
  home,
  admin: {
    action, profile, user
  },
  example: {
    movie
  }
}
