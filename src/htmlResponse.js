// Requires
const fs = require('fs');

// Get HTML and CSS Files
const client = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

// getClient Function
const getClient = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(client);
  response.end();
};

// getStyle Function
const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
  response.end();
};

// Exports
module.exports = {
  getClient,
  getStyle,
};
