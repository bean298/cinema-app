import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 gap-5">
        {/* Avatar */}
        <View className="w-28 h-28 rounded-full bg-dark-100 flex items-center justify-center shadow-md">
          <EvilIcons name="user" size={84} color="#fff" />
        </View>

        {/* Name */}
        <Text className="text-white text-2xl font-bold">Cristiano Ronaldo</Text>

        {/* Info */}
        <View className="flex-col items-center gap-1">
          <Text className="text-gray-300 text-base">Portugal</Text>
          <Text className="text-gray-300 text-base">Men</Text>
          <Text className="text-gray-300 text-base">Football Player</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
