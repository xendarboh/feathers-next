import React from 'react';
import { compose } from 'redux';
import Layout from '../components/Layout';
import withAuth from '../components/withAuth';
import { selectUserIsAdmin } from '../store';

const PrivateAdmin = () => (
  <Layout>
    <h1>Admin-Only Page</h1>
    <p>
      This page is accessible by <i>admin</i> users only.
    </p>
    <p>This page is hidden (404) for everyone else.</p>
  </Layout>
);

export default compose(
  withAuth({
    selector: selectUserIsAdmin,
    statusCode: 404,
  }),
)(PrivateAdmin);
