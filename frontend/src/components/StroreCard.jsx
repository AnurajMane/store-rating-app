import RatingForm from "./RatingForm";

function StoreCard({
  store,
  onRate,
}) {
  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <h4>
          {store.name}
        </h4>

        <p>
          <strong>
            Email:
          </strong>{" "}
          {store.email}
        </p>

        <p>
          <strong>
            Address:
          </strong>{" "}
          {store.address}
        </p>

        <p>
          <strong>
            Average Rating:
          </strong>{" "}
          {
            store.overall_rating
          }
        </p>

        <p>
          <strong>
            Your Rating:
          </strong>{" "}
          {store.user_rating ||
            "Not Rated"}
        </p>

        <RatingForm
          storeId={store.id}
          currentRating={
            store.user_rating
          }
          onSubmit={onRate}
        />

      </div>

    </div>
  );
}

export default StoreCard;