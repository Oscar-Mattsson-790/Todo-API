function checkBody(request, response, next) {
  const body = request.body;

  if (body?.todo) {
    next(); // Gå vidare till nästa funktion som skickar ett svar till frontend
  } else {
    const result = {
      success: false,
      error: "Invalid body",
    };

    response.status(400).json(result);
  }
}

function checkParams(request, response, next) {
  const id = request.params.id;
  console.log(`Param id: ${typeof id}`);

  if (id) {
    next(); // Gå vidare till nästa funktion som skickar ett svar till frontend
  } else {
    const result = {
      success: false,
      error: "No id in url",
    };

    response.status(400).json(result);
  }
}

module.exports = { checkBody, checkParams };
