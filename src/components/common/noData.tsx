import React from "react";
import {Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const PRIMARY = "#1E5A99";

type Props = {
    title?: string;
    description?: string;
    icon?: keyof typeof Ionicons.glyphMap;
};

export default function NoData({
                                   title = "داده‌ای یافت نشد",
                                   description = "در حال حاضر هیچ اطلاعاتی برای نمایش وجود ندارد",
                                   icon = "cloud-offline-outline",
                               }: Props) {
    return (
        <View className="bg-white flex-1 rounded-3xl p-6 border border-slate-100 items-center justify-center">

            {/* Icon */}
            <View className="h-16 w-16 rounded-2xl bg-[#1E5A99]/10 items-center justify-center mb-4">
                <Ionicons name={icon} size={30} color={PRIMARY}/>
            </View>

            {/* Title */}
            <Text className="text-lg font-yekanBold text-[#1E5A99] text-center">
                {title}
            </Text>

            {/* Description */}
            <Text className="text-slate-400 text-sm mt-2 text-center font-yekan">
                {description}
            </Text>

        </View>
    );
}