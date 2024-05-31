export const refreshTokenHandler = async (refreshToken: string) => {
  console.log('Attempt to refresh token');  // General log statement, avoid logging sensitive data
  try {
    const response = await fetch('https://dev-5gdulzrjlzzfplri.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: 'lSGPj0zEVKvepFST5aZPi0z0zbZGvlzR',  
        refresh_token: refreshToken
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Token refreshed successfully', data);
    const expiresAt = Date.now() + data.expires_in * 1000 - 1000;

    return {...data, expiresAt};
  } catch (error) {
    console.error('Failed to refresh token:', error);
    // Handle specific actions based on the type of error or rethrow to be handled upstream
  }
}
