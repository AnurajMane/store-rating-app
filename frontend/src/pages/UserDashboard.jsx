import { useEffect, useState } from "react";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import StoreCard from "../components/StoreCard";

function UserDashboard() {
  const [stores, setStores] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores =
    async () => {
      try {
        setLoading(true);

        const response =
          await api.get(
            "/stores"
          );

        setStores(
          response.data.stores
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const handleRating =
    async (
      storeId,
      rating
    ) => {
      try {
        const store =
          stores.find(
            (s) =>
              s.id ===
              storeId
          );

        if (
          store?.user_rating
        ) {
          await api.put(
            `/stores/${storeId}/rating`,
            {
              rating,
            }
          );

          alert(
            "Rating updated successfully"
          );
        } else {
          await api.post(
            `/stores/${storeId}/rating`,
            {
              rating,
            }
          );

          alert(
            "Rating submitted successfully"
          );
        }

        fetchStores();

      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Operation failed"
        );
      }
    };

  const filteredStores =
    stores.filter(
      (store) =>
        store.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        store.address
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          User Dashboard
        </h2>

        <div className="card p-3 mb-4">

          <h5>
            Search Stores
          </h5>

          <input
            type="text"
            className="form-control"
            placeholder="Search by Store Name or Address"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        {loading ? (
          <div className="text-center mt-5">
            <h4>
              Loading...
            </h4>
          </div>
        ) : filteredStores.length ===
          0 ? (
          <div className="alert alert-warning">
            No Stores Found
          </div>
        ) : (
          filteredStores.map(
            (store) => (
              <StoreCard
                key={
                  store.id
                }
                store={store}
                onRate={
                  handleRating
                }
              />
            )
          )
        )}

      </div>
    </>
  );
}

export default UserDashboard;