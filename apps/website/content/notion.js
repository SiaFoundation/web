const { Client } = require('@notionhq/client')
require('dotenv').config()

module.exports = {
  Notion: new Client({
    auth: process.env.NOTION_TOKEN,
  }),
}
