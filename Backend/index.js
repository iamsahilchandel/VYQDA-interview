const axios = require('axios');

const url = 'https://chimpu.online/api/post.php';
const data = { phonenumber: '1234567890' };

const fetchData = async () => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response Headers:');
    Object.keys(response.headers).forEach((key) => {
      console.log(`${key}: ${response.headers[key]}`);
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

fetchData();
