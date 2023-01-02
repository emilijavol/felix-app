import Button from "../Button";
import "./index.css";

function MovieCard({ title, description, image, onToggleFavorite, isFavorite }) {
  return (
    <div className="MovieCard">
      <div className="MovieCard__image-container">
        <img src={image} alt={`${title} movie poster`} />
      </div>
      <div className="MovieCard__content-container">
        <div>
          <h3 className="MovieCard__title">{title}</h3>
          <p className="MovieCard__description">{description}</p>
        </div>
        <Button onClick={onToggleFavorite} size="small" design={isFavorite ? "outline" : null}>
          {isFavorite ? "Remove" : "Add"}
        </Button>
      </div>
    </div>
  );
}

export default MovieCard;
