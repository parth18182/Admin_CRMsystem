import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Users from "./pages/Users";
import Cities from "./pages/Cities";
import Areas from "./pages/Areas";
import Products from "./pages/Products";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard/users"
          />
        }
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      >

        <Route
          path="users"
          element={<Users />}
        />

        <Route
          path="cities"
          element={<Cities />}
        />

        <Route
          path="areas"
          element={<Areas />}
        />
        <Route
          path="products"
          element={<Products />}
        />

      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard/users"
          />
        }
      />

    </Routes>
  );
}

export default App;