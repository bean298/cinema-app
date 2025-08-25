import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] mb-4">
        {/* Movie Image */}
        <Image
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
        />

        {/* Movie Title */}
        <Text
          className="text-sm font-bold text-white mt-2"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>

        {/* Movie Rating  */}
        <View className="flex-row items-center justify-start gap-x-1">
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text className="text-sx text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        {/* Movie Release Dated */}
        <Text className="text-xs text-light-300 font-medium mt-1">
          {release_date}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
