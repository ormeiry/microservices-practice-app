const express = require('express');
const axios = require('axios');
const BodyParser = require('body-parser');

const app = express();
app.use(BodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://eventbus-srv:4005/events', {
      type: 'commentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on port 4003');
});
