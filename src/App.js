import { Routes, Route, Navigate } from "react-router-dom";
import Unauthenticated from "./layouts/Unauthenticated";
import Authenticated from "./layouts/Authenticated";

import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<Unauthenticated />} />;
      <Route path="/user/*" element={<Authenticated />} />;
      <Route path="*" element={<Navigate to="/auth/login" />} />;
    </Routes>
  );
};

export default App;
