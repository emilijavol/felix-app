import Header from "../Header";
import Footer from "../Footer";

import "./index.css";

function Layout({ children, updateAuthToken, authToken }) {
  return (
    <div className="Layout">
      <Header updateAuthToken={updateAuthToken} authToken={authToken} />
      <main className="Layout__main">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
