import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import Routes from './routes.jsx'

import './globalStyles.css'

const root = createRoot(document.getElementById('root'));

root.render(
	<Auth0Provider
		domain="trulyaman25.us.auth0.com"
		clientId="uvUqiVwXm0ppLF1Gh3NgBJ8Rirr26eTE"
		authorizationParams={{
		redirect_uri: window.location.origin
		}}
	>
		<Routes />
	</Auth0Provider>,
);