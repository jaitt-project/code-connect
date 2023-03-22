// import React, { useState } from 'react';
// import { Router, Route, Routes, useNavigate } from 'react-router-dom';
// import SignUpForm from './signUp';
// import LogInForm from './login';

// const Auth = (props) => {
//   const [formType, setFormType] = useState('signIn');
//   const { loggedIn, setLoggedIn, user, setUser } = props;
//   const navigate = useNavigate();

//   const toggleFormType = () => {
//     setFormType((prevFormType) =>
//       prevFormType === 'signIn' ? 'signUp' : 'signIn'
//     );
//   };

//   const handleSignUpSuccess = () => {
//     setLoggedIn(true);
//     navigate('/');
//   };

//   return (
//     <div id='auth-container'>
//       <div id='theme-bg-auth'>
//         <Routes>
//           <Route
//             path='/auth/sign-in'
//             element={
//               <LogInForm
//                 toggleFormType={toggleFormType}
//                 loggedIn={loggedIn}
//                 setLoggedIn={setLoggedIn}
//                 user={user}
//                 setUser={setUser}
//               />
//             }
//           />
//           <Route
//             path='/auth/sign-up'
//             element={
//               <SignUpForm
//                 toggleFormType={toggleFormType}
//                 loggedIn={loggedIn}
//                 setLoggedIn={setLoggedIn}
//                 user={user}
//                 setUser={setUser}
//                 onSignUpSuccess={handleSignUpSuccess}
//               />
//             }
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Auth;
