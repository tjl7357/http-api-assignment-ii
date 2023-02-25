// Requires
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./jsonResponse.js');

// Port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// URL Structs
const getUrlStruct = {
  '/': htmlHandler.getClient,
  '/style.css': htmlHandler.getStyle,
  '/getUsers': jsonHandler.getUsers,
  notFound: jsonHandler.getNotFound,
};

const headUrlStruct = {
  '/getUsers': jsonHandler.getUsersMeta,
  notFound: jsonHandler.getNotFoundMeta,
};

const postUrlStruct = {
  '/addUser': jsonHandler.addUser,
};

// Parse Post Function
const parseBody = (request, response, handlerFunction) => {
  const body = [];

  request.on('error', (err) => {
    console.log(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    handlerFunction(request, response, bodyParams);
  });
};

// Handle Functions
const handleGet = (request, response, parsedUrl) => {
  const func = getUrlStruct[parsedUrl.pathname];

  if (func) {
    func(request, response);
  } else {
    getUrlStruct.notFound(request, response);
  }
};

const handleHead = (request, response, parsedUrl) => {
  const func = headUrlStruct[parsedUrl.pathname];

  if (func) {
    func(request, response);
  } else {
    headUrlStruct.notFound(request, response);
  }
};

const handlePost = (request, response, parsedUrl) => {
  const func = postUrlStruct[parsedUrl.pathname];

  if (func) {
    parseBody(request, response, func);
  } else {
    getUrlStruct.notFound(request, response);
  }
};

// onRequest Function
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  switch (request.method) {
    case 'HEAD':
      handleHead(request, response, parsedUrl);
      break;
    case 'POST':
      handlePost(request, response, parsedUrl);
      break;
    default:
      handleGet(request, response, parsedUrl);
      break;
  }
};

// Start Server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
