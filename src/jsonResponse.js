/* Users Format
{
    'TJ': {
        name: 'TJ',
        age: 21
    }
}
*/

const users = {};

// JSON response function
const respondJSON = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(content));
  response.end();
};

// HEAD JSON response function
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// getUsers function
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
    respondJSONMeta(request, response, 200);
};

// addUser Function
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'addUserMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  if (!users[body.name]) {
    responseCode = 201;
    users[body.name] = {
      name: body.name,
    };
  }

  users[body.name].age = body.age;

  responseJSON.message = 'Created Successfully';
  if (responseCode === 201) {
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// Not Real Responses
const getNotFound = (request, response) => {
    const responseJSON = {
        message: 'The page you were looking for was not found',
        id: 'notFound'
    }

    respondJSON(request, response, 404, responseJSON);
};

const getNotFoundMeta = (request, response) => {
    respondJSONMeta(request, repsonse, 404);
}

// Exports
module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  getNotFound,
  getNotFoundMeta,
};
