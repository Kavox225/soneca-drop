const RatingNeon = ({ rate, count }) => {
  const fullStars = Math.floor(rate || 0);
  const hasHalfStar = (rate || 0) % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rating-neon">
      <div className="rating-neon__stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="rating-neon__star rating-neon__star--full">
            ★
          </span>
        ))}
        {hasHalfStar && (
          <span className="rating-neon__star rating-neon__star--half">
            ★
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="rating-neon__star rating-neon__star--empty">
            ★
          </span>
        ))}
      </div>
      {count && (
        <span className="rating-neon__count">
          ({count})
        </span>
      )}
    </div>
  );
};

export default RatingNeon;
