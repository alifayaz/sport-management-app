import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { LoginFormType, RegisterFormType } from '@/types/schemas';

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

  async register(body: RegisterFormType) {
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

  async getUnpaidMembers() {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/${APP_VERSION}/members/unpaid`,
      {
        headers,
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch unpaid members');
    }

    // Mock data for demonstration
    return [
      {
        id: '1',
        name: 'احمد محمدی',
        avatar: '/placeholder.svg?height=50&width=50',
        daysOverdue: 5,
        amount: 300000,
      },
      {
        id: '2',
        name: 'فاطمه احمدی',
        avatar: '/placeholder.svg?height=50&width=50',
        daysOverdue: 12,
        amount: 350000,
      },
    ];
  }

  async getAthletes() {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/${APP_VERSION}/athletes`,
      {
        headers,
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch athletes');
    }

    // Mock data for demonstration
    return [
      {
        id: '1',
        name: 'علی',
        lastName: 'رضایی',
        avatar: '/placeholder.svg?height=60&width=60',
        registrationDate: '2024-01-15',
        monthlyFee: 300000,
        weight: 75,
        height: 180,
        medicalIssues: '',
        isPaid: true,
      },
      {
        id: '2',
        name: 'مریم',
        lastName: 'احمدی',
        avatar: '/placeholder.svg?height=60&width=60',
        registrationDate: '2024-02-01',
        monthlyFee: 350000,
        weight: 60,
        height: 165,
        medicalIssues: 'مشکل زانو',
        isPaid: false,
      },
    ];
  }

  async addAthlete(athleteData: any) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/${APP_VERSION}/athletes`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(athleteData),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to add athlete');
    }

    return response.json();
  }

  async getExpenses() {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/${APP_VERSION}/expenses`,
      {
        headers,
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }

    // Mock data for demonstration
    return [
      {
        id: '1',
        title: 'خرید دمبل جدید',
        amount: 2500000,
        category: 'تجهیزات',
        date: '2024-01-10',
        description: 'دمبل‌های 10 تا 50 کیلویی',
      },
      {
        id: '2',
        title: 'قبض برق',
        amount: 800000,
        category: 'برق و آب',
        date: '2024-01-05',
        description: '',
      },
    ];
  }

  async addExpense(expenseData: any) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/${APP_VERSION}/expenses`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(expenseData),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to add expense');
    }

    return response.json();
  }
}

export const apiService = new ApiService();
