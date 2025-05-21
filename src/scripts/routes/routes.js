import HomePage from '../pages/home/home-page';
import NewPage from '../pages/new/new-page';
import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';
import DetailPage from '../pages/repot-detail/detail-page';
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';
import BookmarkPage from '../pages/bookmark/bookmark-page';


const routes = {
  '/login':  checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': checkUnauthenticatedRouteOnly(new RegisterPage()),
  
  '/': checkAuthenticatedRoute(new HomePage()),
  '/tambah': checkAuthenticatedRoute(new NewPage()),
  '/stories/:id': checkAuthenticatedRoute(new DetailPage()), 
  '/bookmark': checkAuthenticatedRoute(new BookmarkPage()),
};

export default routes;
