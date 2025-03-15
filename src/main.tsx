import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Dashboard } from "./dashboard";
import "./styles.css";
import { AppProviders } from "./providers/app-providers";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { RouteNamesEnum } from "./localConstants";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <main className="dark:bg-gray-900 min-h-screen">
        <AppProviders>
          <Routes>
            <Route path={"/"} element={<Dashboard />} />
            {routes.map((route) => (
              <Route
                path={route.path}
                key={`route-key-'${route.path}`}
                element={<route.component />}
              />
            ))}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AppProviders>
      </main>
    </BrowserRouter>
  </React.StrictMode>
);
