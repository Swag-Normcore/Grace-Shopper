import axios from "axios";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function getAllProducts() {
  try {
    const { data: products } = await axios.get("/api/products");
    console.log(products);
    return products;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCategories() {
  try {
    const { data: categories } = await axios.get("/api/categories");
    console.log("Get all categories in axios", categories);
    return categories;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllUsers() {
  try {
    const { data: users } = await axios.get("/api/users");
    console.log(users);
    return users;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(userId) {
  try {
    const { data: user } = await axios.get(`/api/users/${userId}`);
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllFavorites(userId) {
  try {
    const { data: favorites } = await axios.get(`/api/favorites/${userId}`);
    console.log(favorites);
    return favorites;
  } catch (error) {
    console.error(error);
  }
}

// export async function getAllCategories() {
//   try {
//     const result = await axios.get("/api/categories");
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// }
