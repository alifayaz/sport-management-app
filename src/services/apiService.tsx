import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { LoginFormType, RegisterRequest } from '@/types/schemas';

const API_BASE_URL = Constants.expoConfig?.extra?.API_URL;
const APP_VERSION = Constants.expoConfig?.extra?.APP_VERSION;

class ApiService {
  private async getAuthHeaders() {
    const token = await AsyncStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };
  }

  async login(body: LoginFormType) {
    const response = await fetch(
      `${API_BASE_URL}/api/${APP_VERSION}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: body.username.trim(),
          password: body.password,
        }),
      },
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }

    return response.json();
  }

  async register(body: RegisterRequest) {
    const response = await fetch(
      `${API_BASE_URL}/api/${APP_VERSION}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }

    return response.json();
  }

  async getMyAvailable() {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/${APP_VERSION}/availabilities/me`,
      {
        headers,
      },
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }

    return response.json();
  }

  async getAvailableList() {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/${APP_VERSION}/availabilities`,
      {
        headers,
      },
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }

    return response.json();
  }

  async postAvailable(id: string) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/${APP_VERSION}/availabilities/accept`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ availability_id: id }),
      },
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }

    return response.json();
  }

  async getUserInfo() {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/${APP_VERSION}/users/info`,
      {
        headers,
      },
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }

    return response.json();
  }

  async postCancelGame(id: string) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/${APP_VERSION}/availabilities/cancel`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ availability_id: id }),
      },
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }

    return response.json();
  }
}

export const apiService = new ApiService();
