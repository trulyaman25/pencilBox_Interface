import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import Routes from './routes.jsx'

import './globalStyles.css'

const root = createRoot(document.getElementById('root'));

root.render(
	<Auth0Provider
		domain="pencilboxstudio.us.auth0.com"
		clientId="KlemCfDavvzW3GAPknVV5KOfGyPGD0or"
		authorizationParams={{
			redirect_uri: window.location.origin
		}}
	>
		<Routes />
  </Auth0Provider>,
);