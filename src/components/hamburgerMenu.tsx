import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCheckToken } from '@/hooks/token';
import { apiService } from '@/services/apiService';
import { UserInfo } from '@/types/schemas';

export default function HamburgerMenu() {
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState<UserInfo>();
  const hasToken = useCheckToken();

  const navigate = (path: string) => {
    setVisible(false);
    router.push(path as any);
  };

  const handleLogout = async () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'آیا مطمئن هستید که می‌خواهید خارج شوید؟',
      );

      if (confirmed) {
        await AsyncStorage.clear();
        router.replace('/');
      }
    } else {
      Alert.alert('خروج', 'آیا مطمئن هستید که می‌خواهید خارج شوید؟', [
        {
          text: 'لغو',
          style: 'cancel',
        },
        {
          text: 'خروج',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            router.replace('/');
          },
        },
      ]);
    }
  };

  const loadUserData = async () => {
    try {
      const { data } = await apiService.getUserInfo();
      setUserData(data);
    } catch (error) {
      if (error) {
        Alert.alert('خطا', error.toString());
      }
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <View style={{ marginHorizontal: 10 }}>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={30} color="#1E5A99" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setVisible(false)}
          />

          <View style={styles.drawer}>
            {/* Profile */}
            {hasToken && (
              <>
                <View style={styles.profileCard}>
                  <View style={styles.avatar}>
                    <Ionicons name="person" size={42} color="white" />
                  </View>

                  <Text className="font-yekanBold" style={styles.profileName}>
                    {userData?.first_name} {userData?.last_name}
                  </Text>

                  <View style={styles.rateContainer}>
                    <Text className="font-yekan" style={styles.rate}>
                      {Number(userData?.rate || 0).toFixed(1)}
                    </Text>

                    <Ionicons name="star" size={18} color="#FBBF24" />
                  </View>
                </View>

                {/* Menu */}

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigate('/dashboard')}
                >
                  <Ionicons name="grid-outline" size={22} color="#1E5A99" />

                  <Text className="font-yekan" style={styles.menuText}>
                    داشبورد
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigate('/reports')}
                >
                  <Ionicons
                    name="bar-chart-outline"
                    size={22}
                    color="#1E5A99"
                  />

                  <Text className="font-yekan" style={styles.menuText}>
                    گزارشات
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigate('/')}
                >
                  <Ionicons name="settings-outline" size={22} color="#1E5A99" />

                  <Text className="font-yekan" style={styles.menuText}>
                    تنظیمات
                  </Text>
                </TouchableOpacity>

                {/* Logout */}

                <TouchableOpacity
                  style={styles.logoutCard}
                  onPress={handleLogout}
                >
                  <Ionicons name="log-out-outline" size={22} color="#EF4444" />

                  <Text className="font-yekanBold" style={styles.logoutText}>
                    خروج از حساب
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* Support */}

            <View style={styles.supportSection}>
              <Text className="font-yekanBold" style={styles.supportTitle}>
                پشتیبانی
              </Text>

              <View style={styles.supportItem}>
                <Ionicons name="call-outline" size={18} color="#1E5A99" />

                <Text className="font-yekan" style={styles.supportText}>
                  09152027268
                </Text>
              </View>

              <View style={styles.supportItem}>
                <Ionicons name="call-outline" size={18} color="#1E5A99" />

                <Text className="font-yekan" style={styles.supportText}>
                  09150465254
                </Text>
              </View>

              <View style={styles.supportItem}>
                <Ionicons name="mail-outline" size={18} color="#1E5A99" />

                <Text className="font-yekan" style={styles.supportText}>
                  info@bazyar.ir
                </Text>
              </View>
            </View>

            <View style={styles.versionContainer}>
              <Text className="font-yekan" style={styles.versionText}>
                Bazyar v1.0.0
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    padding: 8,
  },

  overlay: {
    flex: 1,
    flexDirection: 'row-reverse',
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.45)',
  },

  drawer: {
    width: 300,
    backgroundColor: '#F8FAFC',
    paddingTop: 28,
    paddingHorizontal: 18,
    paddingBottom: 30,
    marginLeft: 'auto',
    elevation: 15,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  /* ---------------- Profile ---------------- */

  profileCard: {
    backgroundColor: '#1E5A99',
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: 'center',
    marginBottom: 28,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileName: {
    color: '#fff',
    fontSize: 20,
    marginTop: 16,
    textAlign: 'center',
  },

  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  rate: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
  },

  /* ---------------- Menu ---------------- */

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  menuText: {
    marginRight: 14,
    fontSize: 15,
    color: '#0F172A',
  },

  /* ---------------- Logout ---------------- */

  logoutCard: {
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  logoutText: {
    color: '#EF4444',
    marginRight: 8,
    fontSize: 15,
  },

  /* ---------------- Support ---------------- */

  supportSection: {
    marginTop: 32,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },

  supportTitle: {
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 18,
  },

  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  supportText: {
    marginRight: 12,
    fontSize: 14,
    color: '#475569',
  },

  /* ---------------- Version ---------------- */

  versionContainer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: 30,
  },

  versionText: {
    color: '#94A3B8',
    fontSize: 12,
  },
});
