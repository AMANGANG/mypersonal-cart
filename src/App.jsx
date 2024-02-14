// // import React, { useState } from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Login from './Login';
// // import Home from './Home';
// // import ProtectedRoute from './ProtectedRoute';

// // const App = () => {
// //   const [token, setToken] = useState('');

// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/login" element={<Login setToken={setToken} />} />
// //         <ProtectedRoute path="/" element={<Home />} token={token} />
// //       </Routes>
// //     </Router>
// //   );
// // };

// // export default App;
// // App.jsx
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './Login';
// import Home from './Home';

// const App = () => {
//   const [token, setToken] = useState('');

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login setToken={setToken} />} />
//         <Route 
//           path="/" 
//           element={token ? <Home /> : <Navigate to="/login" replace />} 
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute token={token} element={Home} />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
