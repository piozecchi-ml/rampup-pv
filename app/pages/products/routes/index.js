
module.exports = {
  path: '/products',
  resolve: () => require.ensure([], require => require('../view'), 'products.chunk'),
  webpack: () => require.resolveWeak('../view'),
  fetchData: (params, state, history) => restclient.get(`case/${params.caseId}/info`)
    .then(({ data }) => ({ userData: data }))
    .catch(() => history.replace(errorUrl)),
};
