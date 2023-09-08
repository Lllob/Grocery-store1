//import { lazy, Suspense } from "react";//npm run build 
import { Routes, Route } from 'react-router-dom'; //npm i react-router-dom //npm start// for: path="/catalog"

import { PostProvider } from './contexts/PostContext';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from "./components/common/PrivateRoute"; //not logged in user, not to see: create, edit...

 import  Header  from './components/Header/Header.js'
 import Home from './components/Home/Home'
 import  Register from './components/Register/Register.js'
 import  Login  from './components/Login/Login.js'
import Logout from './components/Logout/Logout';
import  Catalog  from './components/Catalog/Catalog'
import  Details  from './components/Details/Details'
import  Create  from './components/Create/Create'
import  Edit  from './components/Edit/Edit'
import MyPosts from './components/MyPosts/MyPosts'
import Shopping from './components/Shopping/Shopping'
import  Search  from './components/Search/Search'
import  Footer  from './components/Footer/Footer'
import  Page404  from './components/Page404/Page404'

import './App.css';

//const Search = lazy(() => import('./components/Search/Search'));

function App() {
  return (
     <AuthProvider> {/*elements sculpt for the whole html */}
     <div id="container">
     <Header />

     <PostProvider>
     <main id="site-content">                           
       {/* <Suspense fallback>{<div>Loading...</div>} */}
     <Routes>
         <Route path="/" element={<Home />} /> 
         <Route path="/catalog" element={<Catalog />} />
       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
       <Route path="/logout" element={<Logout />} />

       <Route path="/details/:id" element={(
            <PrivateRoute>
               <Details />
             </PrivateRoute>
       )} />
    
       <Route path="/create" element={(
            <PrivateRoute>
               <Create />
             </PrivateRoute>
       )} />
        
        <Route path="/edit/:id" element={( 
          <PrivateRoute> 
            <Edit />
          </PrivateRoute> 
      )} /> 

      <Route path="/mylist/:id" element={(
            <PrivateRoute> 
              <MyPosts />
          </PrivateRoute>
      )} /> 

     <Route path="/shopping/:id" element={(
            <PrivateRoute> 
              <Shopping />
          </PrivateRoute>
      )} /> 

    <Route path="/search" element={(
            <PrivateRoute>
                <Search />
          </PrivateRoute>
      )} />

    <Route path="*" element={<Page404 />} />
    </Routes>
    {/* </Suspense>  */}
     
    </main>
    </PostProvider> 
    <Footer />  
   </div>
   </AuthProvider>
   );
}

export default App;


///////////////
//<PrivateRoute> 
//<Suspense fallback={<span>Loading....</span>}>
    // <Search />
// </Suspense>  
