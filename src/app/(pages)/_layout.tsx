import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PagesLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false,
            tabBarStyle: {
                backgroundColor: "#ffffff",
                borderTopColor: "#eee",
                paddingBottom: 10,
                paddingTop: 10,
                marginBottom: 30,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 5 },

                // Android shadow
                elevation: 5,
            },
            tabBarInactiveTintColor: "#1E5A99",
            tabBarActiveTintColor: "#FF5722",
        }}>
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: "خانه",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="requests"
                options={{
                    title: "درخواست ها",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="payments"
                options={{
                    title: "پرداخت‌ها",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="card" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="reports"
                options={{
                    title: "گزارشات",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="analytics" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}