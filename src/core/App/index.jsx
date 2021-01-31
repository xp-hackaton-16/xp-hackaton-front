import {
  EuiPage,
  EuiPageBody,
  EuiPageSideBar,
} from '@elastic/eui';
import Header from '../../components/Header';
import Sidenav from '../../components/Sidenav';
import Router from '../routes';

const App = () => (
  <>
    <Header />
    <EuiPage>
      <EuiPageSideBar>
        <Sidenav />
      </EuiPageSideBar>
      <EuiPageBody component="div">
        <Router />
      </EuiPageBody>
    </EuiPage>
  </>
);

export default App;