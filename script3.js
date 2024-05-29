const refreshAccessToken = async () => {

        const result = await fetch('https://dev-5gdulzrjlzzfplri.us.auth0.com/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grant_type: 'refresh_token',
            client_id: 'lSGPj0zEVKvepFST5aZPi0z0zbZGvlzR',
            refresh_token: 'v1.MVyahH49E1HrBQn6FlPS-5XVYzNeVWxuvN4mCk955JGj5J7wzmtGGwMwJ5LxN8Nw9SHCQ7iNG27YV3eCD4DOgMU'
          }),
        });
        const data = await result.json();
        console.log('refresh token data', data);
        const expiresAt = Date.now() + data.expires_in * 1000 - 1000;

        return {...data, expiresAt};
      }

      refreshAccessToken();