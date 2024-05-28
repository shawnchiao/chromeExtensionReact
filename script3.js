const refreshAccessToken = async () => {

        const result = await fetch('https://dev-5gdulzrjlzzfplri.us.auth0.com/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grant_type: 'refresh_token',
            client_id: 'lSGPj0zEVKvepFST5aZPi0z0zbZGvlzR',
            refresh_token: 'v1.Mppsy3pzYkpA6lzv8vRK51Hcd8weezja0PJg4MlsA4zg2BNIcIbbu7R7R1BnJCs_385urZlzBdJFCM--BK24298'
          }),
        });
        const data = await result.json();
        console.log('refresh token data', data);
        return data;
      }

      refreshAccessToken();