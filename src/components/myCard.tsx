import React from "react";
import {ActivityIndicator, Pressable, Text, View} from "react-native";
import {Feather, Ionicons, MaterialCommunityIcons,} from "@expo/vector-icons";
import {MatchData, MatchStatus} from "@/types/schemas";
import {getArenaTypeFa, getSportNameFa} from "@/utils/constant";

const PRIMARY = "#1E5A99";

type Props = {
    data: MatchData;
    onConfirm?: (id: string) => void;
    loading?: boolean
    offerPage?: boolean
};

const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
};

const getDuration = (start: string, end: string) => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remain = minutes % 60;

    return hours > 0
        ? `${hours} ساعت و ${remain} دقیقه`
        : `${remain} دقیقه`;
};

const StatusBadge = ({status}: { status: MatchStatus }) => {
    const map = {
        active: {
            label: "در حال برگزاری",
            bg: "bg-green-50",
            text: "text-green-600",
            icon: "checkmark-circle-outline",
        },
        expire: {
            label: "منقضی شده",
            bg: "bg-red-50",
            text: "text-red-600",
            icon: "close-circle-outline",
        },
        waiting: {
            label: "در انتظار",
            bg: "bg-yellow-50",
            text: "text-yellow-600",
            icon: "time-outline",
        },
    } as const;

    const item = map[status];

    return (
        <View className={`flex-row items-center px-3 py-1 rounded-2xl ${item?.bg}`}>
            <Ionicons name={item?.icon as any} size={14} color={PRIMARY}/>
            <Text className={`text-xs font-yekan mr-1 ${item?.text}`}>
                {item?.label}
            </Text>
        </View>
    );
};

const MyCard: React.FC<Props> = ({data, onConfirm, loading, offerPage}) => {
    const duration = getDuration(data.start_time, data.end_time);

    return (
        <View className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mt-4">

            {/* HEADER */}
            <View className="flex-row items-center justify-between">
                <View>
                    <Text className="text-xl text-[#1E5A99] font-yekanBold">
                        {getSportNameFa(data.sport)}
                    </Text>

                    <View className="flex-row items-center mt-1">
                        <Ionicons name="location-outline" size={14} color="#94a3b8"/>
                        <Text className="text-slate-400 text-xs mr-1 font-yekan">
                            {data.arena_name}
                        </Text>
                    </View>
                </View>

                <StatusBadge status={data.status}/>
            </View>

            {/* INFO GRID */}
            <View className="mt-5 space-y-3">

                <View className="flex-row items-center">
                    <MaterialCommunityIcons name="stadium" size={18} color={PRIMARY}/>
                    <Text className="text-slate-600 mr-2 font-yekan">
                        نوع زمین: {getArenaTypeFa(data.arena_type)}
                    </Text>
                </View>

                <View className="flex-row items-center">
                    <Feather name="clock" size={18} color={PRIMARY}/>
                    <Text className="text-slate-600 mr-2 font-yekan">
                        مدت زمان: {duration}
                    </Text>
                </View>

                <View className="flex-row items-center">
                    <Feather name="calendar" size={18} color={PRIMARY}/>
                    <Text className="text-slate-600 mr-2 font-yekan text-xs">
                        {formatDateTime(data.start_time)} → {formatDateTime(data.end_time)}
                    </Text>
                </View>
            </View>

            {data.status === "waiting" && offerPage && (
                loading ? (
                        <ActivityIndicator color="#fff"/>
                    ) :
                    <Pressable
                        onPress={() => onConfirm?.(data.id)}
                        className="mt-5 bg-[#1E5A99] rounded-2xl py-3 items-center active:opacity-80 flex-row justify-center"
                    >
                        <Ionicons name="checkmark-circle-outline" size={18} color="white"/>
                        <Text className="text-white font-yekan mr-2">
                            تایید بازی
                        </Text>
                    </Pressable>
            )}

        </View>
    );
};

export default MyCard;