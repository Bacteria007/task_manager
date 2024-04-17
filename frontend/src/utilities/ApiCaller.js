import axios from 'axios';

export default async function ApiCaller(url = "", data = {}, token) {
console.log(token);
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
