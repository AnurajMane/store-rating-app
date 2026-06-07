import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [users, setUsers] =
    useState([]);

  const [stores, setStores] =
    useState([]);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });
  const [storeForm, setStoreForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });
  const [userFilters, setUserFilters] = useState({
  name: "",
  email: "",
  role: "",
});
const [userSort, setUserSort] = useState({
  sortBy: "id",
  order: "ASC",
});
const [storeFilters, setStoreFilters] = useState({
  name: "",
  address: "",
});

const [storeSort, setStoreSort] = useState({
  sortBy: "id",
  order: "ASC",
});

  useEffect(() => {
  fetchDashboard();
  fetchStores();
}, []);

useEffect(() => {
  fetchUsers();
}, [userFilters, userSort]);

useEffect(() => {
  fetchStores();
}, [storeFilters, storeSort]);

  const handleUserChange = (e) => {
  setUserForm({
    ...userForm,
    [e.target.name]: e.target.value,
  });
};

const handleStoreChange = (e) => {
  setStoreForm({
    ...storeForm,
    [e.target.name]: e.target.value,
  });
};
const handleUserFilterChange = (e) => {
  setUserFilters({
    ...userFilters,
    [e.target.name]: e.target.value,
  });
};
const handleUserSortChange = (e) => {
  setUserSort({
    ...userSort,
    [e.target.name]: e.target.value,
  });
};
const handleStoreFilterChange = (e) => {
  setStoreFilters({
    ...storeFilters,
    [e.target.name]: e.target.value,
  });
};

const handleStoreSortChange = (e) => {
  setStoreSort({
    ...storeSort,
    [e.target.name]: e.target.value,
  });
};

  const fetchDashboard =
    async () => {
      try {
        const response =
          await api.get(
            "/admin/dashboard"
          );

        setDashboard(
          response.data.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  const fetchUsers = async () => {
  try {
    const params = new URLSearchParams();

    if (userFilters.name)
      params.append("name", userFilters.name);

    if (userFilters.email)
      params.append("email", userFilters.email);

    if (userFilters.role)
      params.append("role", userFilters.role);

    params.append(
      "sortBy",
      userSort.sortBy
    );

    params.append(
      "order",
      userSort.order
    );

    const response =
      await api.get(
        `/admin/users?${params.toString()}`
      );

    setUsers(
      response.data.users
    );

  } catch (error) {
    console.error(error);
  }
};

  const fetchStores = async () => {
  try {
    const params = new URLSearchParams();

    if (storeFilters.name) {
      params.append(
        "name",
        storeFilters.name
      );
    }

    if (storeFilters.address) {
      params.append(
        "address",
        storeFilters.address
      );
    }

    params.append(
      "sortBy",
      storeSort.sortBy
    );

    params.append(
      "order",
      storeSort.order
    );

    const response =
      await api.get(
        `/admin/stores?${params.toString()}`
      );

    setStores(
      response.data.stores
    );

  } catch (error) {
    console.error(error);
  }
};

    const createUser = async (e) => {
  e.preventDefault();

  try {
    await api.post(
      "/admin/users",
      userForm
    );

    alert("User Created");

    fetchUsers();
    fetchDashboard();

    setUserForm({
      name: "",
      email: "",
      password: "",
      address: "",
      role: "USER",
    });

  } catch (error) {
    console.error(error);
    alert("Failed");
  }
};

const createStore = async (e) => {
  e.preventDefault();

  try {
    await api.post(
      "/admin/stores",
      {
        ...storeForm,
        owner_id: Number(
          storeForm.owner_id
        ),
      }
    );

    alert("Store Created");

    fetchStores();
    fetchDashboard();

    setStoreForm({
      name: "",
      email: "",
      address: "",
      owner_id: "",
    });

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data
        ?.message ||
        "Failed to create store"
    );
  }
};

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          Admin Dashboard
        </h2>

        {/* Dashboard Cards */}

        <div className="row">

          <div className="col-md-4">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5>
                  Total Users
                </h5>

                <h2>
                  {
                    dashboard?.totalUsers
                  }
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5>
                  Total Stores
                </h5>

                <h2>
                  {
                    dashboard?.totalStores
                  }
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5>
                  Total Ratings
                </h5>

                <h2>
                  {
                    dashboard?.totalRatings
                  }
                </h2>
              </div>
            </div>
          </div>

        </div>

        {/* Users */}

        <div className="mt-5">
            <div className="card p-4 mb-4">

  <h4>Create User</h4>

  <form onSubmit={createUser}>

    <div className="row">

      <div className="col-md-3">
        <input
          className="form-control"
          placeholder="Name"
          name="name"
          value={userForm.name}
          onChange={handleUserChange}
        />
      </div>

      <div className="col-md-3">
        <input
          className="form-control"
          placeholder="Email"
          name="email"
          value={userForm.email}
          onChange={handleUserChange}
        />
      </div>

      <div className="col-md-2">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          name="password"
          value={userForm.password}
          onChange={handleUserChange}
        />
      </div>

      <div className="col-md-2">
        <select
          className="form-select"
          name="role"
          value={userForm.role}
          onChange={handleUserChange}
        >
          <option value="USER">
            USER
          </option>

          <option value="STORE_OWNER">
            STORE_OWNER
          </option>
        </select>
      </div>

      <div className="col-md-2">
        <button
          className="btn btn-success w-100"
        >
          Create
        </button>
      </div>

    </div>

    <div className="mt-3">
      <input
        className="form-control"
        placeholder="Address"
        name="address"
        value={userForm.address}
        onChange={handleUserChange}
      />
    </div>

  </form>

</div>
<div className="card p-3 mb-4">

  <h5>User Filters</h5>

  <div className="row">

    <div className="col-md-4">
      <input
        className="form-control"
        placeholder="Search Name"
        name="name"
        value={userFilters.name}
        onChange={handleUserFilterChange}
      />
    </div>

    

    <div className="col-md-4">
      <input
        className="form-control"
        placeholder="Search Email"
        name="email"
        value={userFilters.email}
        onChange={handleUserFilterChange}
      />
    </div>

    <div className="col-md-4">
      <select
        className="form-select"
        name="role"
        value={userFilters.role}
        onChange={handleUserFilterChange}
      >
        <option value="">
          All Roles
        </option>

        <option value="ADMIN">
          ADMIN
        </option>

        <option value="USER">
          USER
        </option>

        <option value="STORE_OWNER">
          STORE_OWNER
        </option>

      </select>
    </div>
    <div className="row mt-3">

  <div className="col-md-6">
    <select
      className="form-select"
      name="sortBy"
      value={userSort.sortBy}
      onChange={handleUserSortChange}
    >
      <option value="id">ID</option>
      <option value="name">Name</option>
      <option value="email">Email</option>
      <option value="role">Role</option>
      <option value="created_at">
        Created Date
      </option>
    </select>
  </div>

  <div className="col-md-6">
    <select
      className="form-select"
      name="order"
      value={userSort.order}
      onChange={handleUserSortChange}
    >
      <option value="ASC">
        Ascending
      </option>

      <option value="DESC">
        Descending
      </option>
    </select>
  </div>

</div>

  </div>

</div>
          <h3>
            Users
          </h3>

          <table className="table table-bordered table-striped">

            <thead>

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Address</th>
              </tr>

            </thead>

            <tbody>

              {users.map(
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
                        user.role
                      }
                    </td>

                    <td>
                      {
                        user.address
                      }
                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        {/* Stores */}

        <div className="mt-5">
             <div className="card p-4 mb-4">

  <h4>Create Store</h4>

  <form onSubmit={createStore}>

    <div className="row">

      <div className="col-md-3">
        <input
          className="form-control"
          placeholder="Store Name"
          name="name"
          value={storeForm.name}
          onChange={handleStoreChange}
        />
      </div>

      <div className="col-md-3">
        <input
          className="form-control"
          placeholder="Store Email"
          name="email"
          value={storeForm.email}
          onChange={handleStoreChange}
        />
      </div>

      <div className="col-md-2">
        <input
          className="form-control"
          placeholder="Owner ID"
          name="owner_id"
          value={storeForm.owner_id}
          onChange={handleStoreChange}
        />
      </div>

      <div className="col-md-2">
        <button
          className="btn btn-primary w-100"
        >
          Create
        </button>
      </div>

    </div>

    <div className="mt-3">
      <input
        className="form-control"
        placeholder="Address"
        name="address"
        value={storeForm.address}
        onChange={handleStoreChange}
      />
    </div>

  </form>

</div> 
<div className="card p-3 mb-4">

  <h5>Store Filters</h5>

  <div className="row">

    <div className="col-md-4">
      <input
        className="form-control"
        placeholder="Search Store Name"
        name="name"
        value={storeFilters.name}
        onChange={handleStoreFilterChange}
      />
    </div>

    <div className="col-md-4">
      <input
        className="form-control"
        placeholder="Search Address"
        name="address"
        value={storeFilters.address}
        onChange={handleStoreFilterChange}
      />
    </div>

  </div>

  <div className="row mt-3">

    <div className="col-md-6">
      <select
        className="form-select"
        name="sortBy"
        value={storeSort.sortBy}
        onChange={handleStoreSortChange}
      >
        <option value="id">ID</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
      </select>
    </div>

    <div className="col-md-6">
      <select
        className="form-select"
        name="order"
        value={storeSort.order}
        onChange={handleStoreSortChange}
      >
        <option value="ASC">
          Ascending
        </option>

        <option value="DESC">
          Descending
        </option>
      </select>
    </div>

  </div>

</div>
          <h3>
            Stores
          </h3>

          <table className="table table-bordered table-striped">

            <thead>

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Rating</th>
              </tr>

            </thead>

            <tbody>

              {stores.map(
                (store) => (
                  <tr
                    key={
                      store.id
                    }
                  >
                    <td>
                      {
                        store.id
                      }
                    </td>

                    <td>
                      {
                        store.name
                      }
                    </td>

                    <td>
                      {
                        store.email
                      }
                    </td>

                    <td>
                      {
                        store.address
                      }
                    </td>

                    <td>
                      {
                        store.overall_rating
                      }
                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;