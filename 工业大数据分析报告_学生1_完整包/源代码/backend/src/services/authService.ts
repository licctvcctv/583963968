export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    username: string;
  };
}

export const authService = {
  login: async (req: LoginRequest): Promise<LoginResponse> => {
    if (req.username === '张三' && req.password === '123456') {
      return {
        success: true,
        message: 'Login successful',
        user: {
          username: req.username
        }
      };
    } else {
      return {
        success: false,
        message: 'Invalid username or password'
      };
    }
  }
};