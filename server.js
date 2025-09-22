const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

const app = express();
app.use(cors());

// Cloudinary credentials, आपके द्वारा प्रदान किए गए API Secret के साथ
cloudinary.config({
  cloud_name: 'dnxbxatyi',
  api_key: '937539385933469',
  api_secret: 'P8KqyZ9QdVEiWC0g9kmdL9sQBuE'
});

app.get('/videos', async (req, res) => {
  try {
    const data = await cloudinary.search
      .expression('resource_type:video')
      .max_results(30)
      .execute();

    const videos = data.resources.map(video => ({
      public_id: video.public_id,
      secure_url: video.secure_url
    }));

    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos from Cloudinary.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});