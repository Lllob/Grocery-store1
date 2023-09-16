import { lazy, Suspense } from "react"; 
import { Routes, Route } from 'react-router-dom'; //npm i react-router-dom //npm start// for: path="/catalog"

import { PostProvider } from './contexts/PostContext';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from "./components/common/PrivateRoute"; //not logged in user, not to see: create, edit...
import './App.css';

 import  Header  from './components/Header/Header.js'
 import  Footer  from './components/Footer/Footer'
 const Home = lazy(() => import('./components/Home/Home'));
 const Register = lazy(() => import('./components/Register/Register.js'));
 const Login = lazy(() => import('./components/Login/Login.js'));
const Logout = lazy(() => import('./components/Logout/Logout'));
const Catalog = lazy(() => import('./components/Catalog/Catalog'));
const Details = lazy(() => import('./components/Details/Details'));
const Create = lazy(() => import('./components/Create/Create'));
const Edit = lazy(() => import('./components/Edit/Edit'));
const MyPosts = lazy(() => import('./components/MyPosts/MyPosts'));
const Shopping = lazy(() => import('./components/Shopping/Shopping'));
const Search = lazy(() => import('./components/Search/Search'));
const Page404 = lazy(() => import('./components/Page404/Page404'));


function App() {
  return (
    
    <div id="container">
       <AuthProvider>
       <PostProvider>
       <Header />

     <main className="main"> 
           <Suspense fallback={<div>Loading...</div>}>          
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
    </Suspense>
    </main>

    <Footer />
    </PostProvider> 
    </AuthProvider>
   </div>
   
   );
}

export default App;


///////////////
//<PrivateRoute> 
//<Suspense fallback={<span>Loading....</span>}>
    // <Search />
// </Suspense>  
