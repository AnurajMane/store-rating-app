import { useState } from "react";

function RatingForm({
  storeId,
  currentRating,
  onSubmit,
}) {
  const [rating, setRating] =
    useState(
      currentRating || 1
    );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(
      storeId,
      Number(rating)
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3"
    >
      <div className="row">

        <div className="col-md-8">

          <select
            className="form-select"
            value={rating}
            onChange={(e) =>
              setRating(
                e.target.value
              )
            }
          >
            <option value="1">
              1 Star
            </option>

            <option value="2">
              2 Stars
            </option>

            <option value="3">
              3 Stars
            </option>

            <option value="4">
              4 Stars
            </option>

            <option value="5">
              5 Stars
            </option>

          </select>

        </div>

        <div className="col-md-4">

          <button className="btn btn-primary w-100">
            Save
          </button>

        </div>

      </div>
    </form>
  );
}

export default RatingForm;