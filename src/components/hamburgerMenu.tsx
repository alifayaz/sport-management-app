import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from "react-native";
import { router } from "expo-router";

export default function HamburgerMenu() {
    const [visible, setVisible] = useState(false);

    const navigate = (path: string) => {
        setVisible(false);
        router.push(path as any);
    };

    return (
        <>
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={styles.menuButton}
            >
                <Text style={styles.menuIcon}>☰</Text>
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
                            onPress={() => navigate("/members")}
                        >
                            <Text style={styles.menuText}>اعضا</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigate("/payments")}
                        >
                            <Text style={styles.menuText}>پرداخت‌ها</Text>
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
                            <Text style={styles.closeText}>بستن</Text>
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
    },

    overlay: {
        flex: 1,
        flexDirection: "row",
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
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: "right",
    },

    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    menuText: {
        fontSize: 16,
        textAlign: "right",
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
});