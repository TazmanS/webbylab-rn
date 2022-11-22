import {
  MOVIE_CREATE,
  MOVIE_DELETE,
  MOVIE_IMPORT,
  MOVIE_LIST,
  MOVIE_SHOW,
  MOVIE_UPDATE,
} from "./endpoints";
import http from "./http";

/**
 * @param {string} actor - Search by actor
 * @param {string} title - Search by movie title
 * @param {string} search - Combined search (movie and actor)
 * @param {string} sort - Possible values: id, title, year. Default: id
 * @param {string} order - Possible values: ASC, DESC. Default: ASC
 * @param {string} limit - Default: 20
 * @param {string} offset - Default: 0
 */
export const apiGetMovies = async ({
  actor = null,
  title = null,
  search = null,
  sort = "id",
  order = "ASC",
  limit = "10",
  offset = "0",
}) => {
  return await http.get(MOVIE_LIST, {
    params: { actor, title, search, sort, order, limit, offset },
  });
};

/**
 * @param {string} title
 * @param {string} format
 * @param {number} year
 * @param {array} actors
 */
export const apiCreateMovie = async ({ title, format, year, actors }) => {
  return await http.post(MOVIE_CREATE, { title, format, year: +year, actors });
};

/**
 * @param {string} movieId
 */
export const apiGetOneMovie = async (id) => {
  return await http.get(MOVIE_SHOW + id);
};

/**
 * @param {string} id
 * @param {string} title
 * @param {string} format
 * @param {number} year
 * @param {array} actors
 */
export const apiUpdateMovie = async (id, { title, format, year, actors }) => {
  return await http.patch(MOVIE_UPDATE + id, { title, format, year, actors });
};

/**
 * @param {string} id
 */
export const apiDeleteMovie = async (id) => {
  return await http.delete(MOVIE_DELETE + id);
};

/**
 * @param {file} file
 */
export const apiImportMovies = async (file) => {
  return await http.post(MOVIE_IMPORT, file);
};
