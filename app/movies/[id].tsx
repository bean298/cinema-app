import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5 px-5">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>

      <Text className="text-light-100 font-bold text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  // Get id of movie
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Fetch movie details by given id to fetchMovieDetails
  const {
    data: movieDetail,
    loading: movieDetailLoading,
    error: movieDetailError,
  } = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Movie Details Image */}

        <View>
          <Image
            className="w-full h-[550px]"
            resizeMode="stretch"
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`,
            }}
          />
        </View>

        {/* Movie Details Title */}
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">
            {movieDetail?.title}
          </Text>
        </View>

        {/* Movie Details Release Date and Run Times */}
        <View className="flex-row items-center gap-x-1 mt-2">
          <Text className="text-light-200 text-sm px-5">
            {movieDetail?.release_date}
          </Text>

          <Text className="text-light-200 text-sm px-5">
            {movieDetail?.runtime}m
          </Text>
        </View>

        {/* Movie Details Rating and Votes */}
        <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2 self-start ml-5">
          <FontAwesome name="star" size={16} color="#FFD700" />

          <Text className="text-sm text-white font-bold ">
            {Math.round(movieDetail?.vote_average ?? 0)}/10
          </Text>

          <Text className="text-sm text-light-300">
            ({movieDetail?.vote_count} votes)
          </Text>
        </View>

        {/* Movie Details Overview */}
        <MovieInfo label="Overview" value={movieDetail?.overview} />

        {/* Movie Details Genres */}
        <MovieInfo
          label="Generes"
          value={movieDetail?.genres?.map((i) => i.name).join(" - ") || "N/A"}
        />

        {/* Movie Details Budget and Revenue */}
        <View className="flex flex-row justify-between w-1/2">
          <MovieInfo
            label="Budget"
            value={`$${(movieDetail?.budget ?? 0) / 1_000_000} million`}
          />

          <MovieInfo
            label="Revenue"
            value={`$${Math.round(
              (movieDetail?.revenue ?? 0) / 1_000_000
            )} million`}
          />
        </View>

        {/* Movie Details Budget and Production Companies */}
        <MovieInfo
          label="Production Companies"
          value={
            movieDetail?.production_companies?.map((c) => c.name).join(" • ") ||
            "N/A"
          }
        />
      </ScrollView>

      {/* Button back */}
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <AntDesign name="caretleft" size={22} color="white" />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
