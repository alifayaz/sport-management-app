import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable, Platform, Alert,
} from "react-native";
import { router } from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HamburgerMenu() {
    const [visible, setVisible] = useState(false);

    const navigate = (path: string) => {
        setVisible(false);
        router.push(path as any);
    };

    const handleLogout = async () => {
        if (Platform.OS === "web") {
            const confirmed = window.confirm(
                "آیا مطمئن هستید که می‌خواهید خارج شوید؟"
            );

            if (confirmed) {
                await AsyncStorage.clear();
                router.replace("/");
            }
        } else {
            Alert.alert(
                "خروج",
                "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
                [
                    { text: "لغو", style: "cancel" },
                    {
                        text: "خروج",
                        style: "destructive",
                        onPress: async () => {
                            await AsyncStorage.clear();
                            router.replace("/");
                        },
                    },
                ]
            );
        }
    };

    return (
        <>
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={styles.menuButton}
            >
                <Text style={styles.menuIcon}><Ionicons name="menu-sharp" color='#1E5A99' size={30} /></Text>
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
                        <Text style={styles.title}>منو</Text>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigate("/dashboard")}
                        >
                            <Text style={styles.menuText}>داشبورد</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigate("/reports")}
                        >
                            <Text style={styles.menuText}>گزارشات</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigate("/settings")}
                        >
                            <Text style={styles.menuText}>تنظیمات</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setVisible(false)}
                        >
                            <Pressable style={styles.button} onPress={handleLogout}>
                                <Ionicons name="log-out" color='#1E5A99' size={25} />
                                <Text style={styles.buttonText}>خروج</Text>
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    menuButton: {
        padding: 8,
    },

    menuIcon: {
        fontSize: 28,
        color: '#1E5A99',
    },

    overlay: {
        flex: 1,
        flexDirection: "row-reverse",
    },

    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
    },

    drawer: {
        width: 280,
        backgroundColor: "#fff",
        paddingTop: 60,
        paddingHorizontal: 20,
        elevation: 10,
        marginLeft: "auto",
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 25,
        fontFamily: 'YekanBakh',
        color: '#1E5A99',
    },

    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    menuText: {
        fontSize: 14,
        fontFamily: 'YekanBakh'
    },

    closeButton: {
        marginTop: 30,
        backgroundColor: "#f5f5f5",
        padding: 12,
        borderRadius: 8,
    },

    closeText: {
        textAlign: "center",
        fontWeight: "bold",
    },
    buttonText: {
        color: '#1E5A99',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'YekanBakh',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5
    },
});