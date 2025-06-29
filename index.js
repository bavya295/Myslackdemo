const axios = require('axios');

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

const CHANNEL = 'C0947AG7N9E';  

async function sendMessage() {
  try {
    const res = await axios.post('https://slack.com/api/chat.postMessage', {
      channel: CHANNEL,
      text: 'Hello from Bavya\'s Node.js script!'
    }, {
      headers: {
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Message Sent:', res.data);

    return res.data.ts;
  } catch (err) {
    console.error('Error sending message:', err.response.data);
  }
}

async function scheduleMessage() {
  try {
    const postAt = Math.floor(Date.now() / 1000) + 60;

    const res = await axios.post('https://slack.com/api/chat.scheduleMessage', {
      channel: CHANNEL,
      text: 'This is a scheduled message!',
      post_at: postAt
    }, {
      headers: {
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Message Scheduled:', res.data);

  } catch (err) {
    console.error('Error scheduling message:', err.response.data);
  }
}

async function fetchMessages() {
  try {
    const res = await axios.get('https://slack.com/api/conversations.history', {
      headers: {
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`
      },
      params: {
        channel: CHANNEL
      }
    });


    if (res.data.messages.length > 0) {
      return res.data.messages[0].ts; 
    }
  } catch (err) {
    if (err.response) {
      console.error('Error fetching messages:', err.response.data);
    } else {
      console.error('Error:', err.message);
    }
  }
}

async function editMessage(ts) {
  try {
    const res = await axios.post('https://slack.com/api/chat.update', {
      channel: CHANNEL,
      ts: ts,
      text: 'This message was edited by Bavya\'s script!'
    }, {
      headers: {
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Message Edited:', res.data);

  } catch (err) {
    console.error('Error editing message:', err.response.data);
  }
}

(async () => {
  const ts = await sendMessage();

  await scheduleMessage();

  const fetchedTs = await fetchMessages();

  if (fetchedTs) {
    await editMessage(fetchedTs);
  }
})();
