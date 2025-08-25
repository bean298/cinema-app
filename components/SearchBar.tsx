import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

// Type of data need to provide
interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      {/* Icon */}
      <MaterialCommunityIcons
        name={"magnify"}
        size={20}
        color="#ab8bff"
        style={{ marginLeft: 20 }}
      />

      {/* Input */}
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8bb5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
