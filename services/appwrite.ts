// Track the searches made by a user

import { Client, Databases, ID, Query } from "react-native-appwrite";

// Connect with appwrite server thought client
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

// Function modify search count
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    // Query into database
    const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.equal("searchTerm", query),
    ]);
    // console.log("Kết quả tìm kiếm từ db: ", result);

    // Check if a record of that search has already been stored
    if (result.documents.length > 0) {
      // If a record is found, increment the searchCount field
      const existingMovie = result.documents[0];
      // console.log("Kết quả phim đã tồn tại: ", existingMovie);

      await database.updateDocument(DATABASE_ID, TABLE_ID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      // If no record is found, create new record in Appwrite database with searchCount = 1
      await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
        searchTerm: query,
        title: movie.title,
        movie_id: movie.id,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Function get trending movies
export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    // Query into database
    const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    // console.log("Kết quả trending movies: ", result);

    return result.documents as unknown as TrendingMovie[];
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
