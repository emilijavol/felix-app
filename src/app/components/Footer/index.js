import creditCardsImg from "../../images/credit-cards.png";
import "./index.css";

function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer__container">
        <p>We care about your entertainment. Copyright © 2019-2022 felix.com</p>
        <img src={creditCardsImg} alt="credit card icons" />
      </div>
    </footer>
  );
}

export default Footer;
