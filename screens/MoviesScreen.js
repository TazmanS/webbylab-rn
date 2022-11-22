import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { apiDeleteMovie, apiGetMovies, apiImportMovies } from "../api/movies";
import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";
import { setMovies } from "../store/globalSlice";
import * as DocumentPicker from "expo-document-picker";

const FILTERS = {
  YEAR: "year",
  DEFAULT: "id",
  TITLE: "title",
};

const MoviesScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const { movies } = useSelector((state) => state.global);
  const [activeFilter, setActiveFilter] = useState(FILTERS.DEFAULT);
  const [titleFilter, setTitleFilter] = useState("");
  const [actorFilter, setActorFilter] = useState("");
  const [commonSearchFilter, setCommonSearchFilter] = useState("");
  const [limit, setLimit] = useState(10);

  const fetchMovies = async () => {
    try {
      const res = await apiGetMovies({
        sort: activeFilter,
        actor: actorFilter.length > 3 ? actorFilter : null,
        title: titleFilter.length > 3 ? titleFilter : null,
        search: commonSearchFilter.length > 3 ? commonSearchFilter : null,
        limit,
      });
      setMovies(res.data.data);
      dispatch(setMovies(res.data.data));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [activeFilter, titleFilter, commonSearchFilter, actorFilter, limit]);

  const createMovie = () => {
    navigation.navigate("MovieScreen");
  };

  const deleteMovie = async (id) => {
    try {
      await apiDeleteMovie(id);
      dispatch(setMovies(movies.filter((i) => i.id !== id)));
    } catch (e) {
      console.log(e);
    }
  };

  const updateMovie = (id) => {
    navigation.navigate("MovieScreen", {
      params: {
        movieId: id,
      },
    });
  };

  const importMovies = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "text/plain",
      });
      const data = new FormData();
      data.append("movies", {
        name: file.name,
        type: file.mimeType,
        uri: Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
      });
      const res = await apiImportMovies(data);
      if (res.data.status === 1) {
        // dispatch(setMovies([...movies, ...res.data.data]));
        fetchMovies();
      }
    } catch (e) {
      console.log(111, e);
    }
  };

  const ListItem = ({ item }) => {
    const { title, format, year, id } = item;
    return (
      <View style={styles.item}>
        <Text style={styles.item_text}>{title}</Text>
        <Text style={styles.item_text}>{format}</Text>
        <Text style={styles.item_text}>{year}</Text>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => updateMovie(id)}>
          <Text style={{ fontSize: 16 }}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => deleteMovie(id)}>
          <Text style={{ fontSize: 16 }}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ListHeaderComponent = () => (
    <View style={styles.listHeader}>
      <Text style={styles.header_item}>Name</Text>
      <Text style={styles.header_item}>Format</Text>
      <Text style={styles.header_item}>Year</Text>
      <Text style={styles.header_item}></Text>
      <Text style={styles.header_item}></Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View>
              <BaseInput
                width={"100%"}
                placeholder="Search by title"
                icon="magnifying-glass"
                value={titleFilter}
                setValue={(text) => setTitleFilter(text)}
              />
              <BaseInput
                width={"100%"}
                placeholder="Search by actors"
                icon="magnifying-glass"
                value={actorFilter}
                setValue={(text) => setActorFilter(text)}
              />
              <BaseInput
                width={"100%"}
                placeholder="Common search"
                icon="magnifying-glass"
                value={commonSearchFilter}
                setValue={(text) => setCommonSearchFilter(text)}
              />
            </View>
            <View style={{ flexDirection: "row", marginBottom: 12 }}>
              <Text style={styles.filterItem}>Sort:</Text>
              <TouchableOpacity
                onPress={() => setActiveFilter(FILTERS.DEFAULT)}
              >
                <Text
                  style={{
                    ...styles.filterItem,
                    color: activeFilter === FILTERS.DEFAULT ? "blue" : "black",
                  }}
                >
                  Default
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveFilter(FILTERS.TITLE)}>
                <Text
                  style={{
                    ...styles.filterItem,
                    color: activeFilter === FILTERS.TITLE ? "blue" : "black",
                  }}
                >
                  Title
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveFilter(FILTERS.YEAR)}>
                <Text
                  style={{
                    ...styles.filterItem,
                    color: activeFilter === FILTERS.YEAR ? "blue" : "black",
                  }}
                >
                  Year
                </Text>
              </TouchableOpacity>
            </View>
            {movies.length > 0 ? (
              <FlatList
                data={movies}
                renderItem={({ item }) => <ListItem item={item} />}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={ListHeaderComponent}
                onEndReached={() => setLimit((prev) => prev + 10)}
              />
            ) : (
              <View style={styles.center}>
                <Text style={{ fontSize: 20 }}>No data</Text>
              </View>
            )}
          </View>
        )}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={createMovie}
        >
          <Text style={styles.newMovie}>New movie</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={importMovies}
        >
          <Text style={styles.newMovie}>Import movies</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  newMovie: {
    justifyContent: "center",
    alignItems: "center",
    color: "blue",
    fontSize: 20,
    marginVertical: 18,
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "light-grey",
    paddingVertical: 8,
    // justifyContent: "space-between",
  },
  item_text: {
    fontSize: 16,
    flex: 1,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  header_item: {
    flex: 1,
    fontSize: 16,
  },
  filterItem: {
    fontSize: 16,
    marginRight: 12,
  },
});

export default MoviesScreen;
