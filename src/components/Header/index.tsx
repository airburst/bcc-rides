import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/bath-cc-logo.svg"
import styles from "./Header.module.css";

export const Header = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link to="/" title="Home">
            <img className={styles.logo} src={Logo} alt="Bath Cycling Club Logo" />
            BCC Rides
          </Link>
        </div>
        {isAuthenticated
          ? (
            <div className={styles.right} >
              <button className={styles.loginBtn} onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
            </div>
          )
          : (
            <div className={styles.right} >
              <button className={styles.loginBtn} onClick={() => loginWithRedirect()}>Log in</button>
            </div>
          )
        }
      </div>
    </div>
  );
};
