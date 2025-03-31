import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import Routes from './routes.jsx'

import './globalStyles.css'

const root = createRoot(document.getElementById('root'));

root.render(
	<Auth0Provider
		domain="pencilboxstudio.us.auth0.com"
		clientId="NI1cXKIx1JNoMs9dBnBCePYhhLnoGbZP"
		authorizationParams={{
			redirect_uri: window.location.origin
		}}
	>
		<Routes />
  </Auth0Provider>,
);