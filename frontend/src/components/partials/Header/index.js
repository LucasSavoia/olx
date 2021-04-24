import React from 'react';
import { Link } from 'react-router-dom'
import { HeaderArea } from './styled'

import { isLogged, doLogout } from '../../../helpers/AuthHandler'

const Header = () => {
  let logged = isLogged();

  function handleLogout() {
    doLogout();
    window.location.href = '/';
  }

  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="logo-1">O</span>
            <span className="logo-2">L</span>
            <span className="logo-3">X</span>
          </Link>
        </div>
        <nav>
          <ul>

            {logged &&
              <>
                <li>
                  <Link to="/myaccount">Minha Conta</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
                <li>
                  <Link className="button" to="/post-an-ad">Poste um anúncio</Link>
                </li>
              </>
            }

            {!logged &&
              <>
                <li>
                  <Link to="/signin">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Cadastrar</Link>
                </li>
              </>
            }
          </ul>
        </nav>
      </div>
    </HeaderArea>
  )
}

export default Header;