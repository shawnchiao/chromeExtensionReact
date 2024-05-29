export const refreshTokenHandler = async (refreshToken:string) => {

  const result = await fetch('https://dev-5gdulzrjlzzfplri.us.auth0.com/oauth/token', {
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
  const data = await result.json();
  console.log('refresh token data', data);
  return data;
}

