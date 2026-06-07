import { useEffect, useState } from "react";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function StoreOwnerDashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [ratings, setRatings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchRatings();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const response =
          await api.get(
            "/store-owner/dashboard"
          );

        setDashboard(
          response.data.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  const fetchRatings =
    async () => {
      try {
        const response =
          await api.get(
            "/store-owner/ratings"
          );

        setRatings(
          response.data.ratings
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          Store Owner Dashboard
        </h2>

        {dashboard && (
          <div className="row mb-4">

            <div className="col-md-6">
              <div className="card shadow">

                <div className="card-body text-center">

                  <h5>
                    Store Name
                  </h5>

                  <h3>
                    {
                      dashboard.storeName
                    }
                  </h3>

                </div>

              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow">

                <div className="card-body text-center">

                  <h5>
                    Average Rating
                  </h5>

                  <h3>
                    {
                      dashboard.averageRating
                    }
                  </h3>

                </div>

              </div>
            </div>

          </div>
        )}

        <div className="card shadow">

          <div className="card-body">

            <h4 className="mb-3">
              Users Who Rated Your Store
            </h4>

            {loading ? (
              <h5>
                Loading...
              </h5>
            ) : ratings.length === 0 ? (
              <div className="alert alert-warning">
                No ratings found.
              </div>
            ) : (
              <table className="table table-bordered table-striped">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Rating</th>
                  </tr>

                </thead>

                <tbody>

                  {ratings.map(
                    (user) => (
                      <tr
                        key={
                          user.id
                        }
                      >
                        <td>
                          {
                            user.id
                          }
                        </td>

                        <td>
                          {
                            user.name
                          }
                        </td>

                        <td>
                          {
                            user.email
                          }
                        </td>

                        <td>
                          {
                            user.rating
                          }
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>
            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default StoreOwnerDashboard;