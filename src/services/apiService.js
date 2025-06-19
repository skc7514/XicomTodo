import axios from 'axios';

export const BASE_URL = 'https://dev3.xicomtechnologies.com';
export const API_URL = `${BASE_URL}/xttest`;


export const getData = async (endpoint) => {
};

// export const postData = async (endpoint, data) => {
//   // console.log('data:', data);
//   // try {
//   //   const formData = new FormData();
//   //   for (const key in data) {
//   //     formData.append(key, data[key]);
//   //   }
//   //   const response = await fetch(`${API_URL}${endpoint}`, {
//   //     method: 'POST',
//   //     body: formData,
//   //   });
//   //   // console.log('formData', formData)
//   //   const result = await response.json();
//   //   console.log('POST request:', result);
//   //   if (!response.ok) {
//   //     throw new Error(result.message || 'Something went wrong');
//   //   }
//   //   return result;
//   // } catch (error) {
//   //   console.error('POST request error:', error);
//   //   throw error;
//   // }
// };


export const postData = async (endpoint, data) => {
  console.log('data:', data);
  try {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    console.log('formData', formData);
    const response = await axios.post(`${API_URL}${endpoint}`, formData, {
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    });

    console.log('POST request:', response);
    return response.data;
  } catch (error) {
    console.error('POST request error:', error.response?.data || error.message);
    throw error;
  }
};