import { compose } from 'redux';
import Layout from '../components/Layout';
import withAuth from '../components/withAuth';

const Index = () => (
  <Layout>
    <h1>Home Page</h1>
    <p>This page is accessible by everyone.</p>
  </Layout>
);

export default compose(
  withAuth({ selector: () => true }),
  // connect(), // connect would go after withAuth
)(Index);
