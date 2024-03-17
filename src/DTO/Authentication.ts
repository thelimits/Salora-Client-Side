interface AuthResponse {
    access_token: string;
    refresh_token: string;
}

interface SessionData {
    users: {
      s_id: string,
      s_uname: string
    },
    authorities: [
      {
        authority: string
      }
    ],
    sub: string,
    iat: number,
    exp: number
  }