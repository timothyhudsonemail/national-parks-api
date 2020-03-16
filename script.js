'use strict';
const apiKey = 'OLwKKcJoDeNlTjJPi7YCH2vZv4yPLrzg0KHbcEEC';
const searchURL = 'https://api.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => 
    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      return queryItems.join('&')
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<h2>${responseJson.data[i].fullName}<h2>
          <li>
              <p>${responseJson.data[i].description}<p>
              <p><strong>Address:</strong>&nbsp;${responseJson.data[i].addresses[0].line1}
              ${responseJson.data[i].addresses[0].city},
              ${responseJson.data[i].addresses[0].stateCode}
              ${responseJson.data[i].addresses[0].postalCode}</p>
              <a href="url">${responseJson.data[i].url}
          </li>`
    )};
  $('#results').removeClass('hidden');
};


function getParks(query, maxResults) {
  const params = {
    key:apiKey,
    q:query,
    fields: ['addresses'],
    limit: maxResults
  };

  const queryString = formatQueryParams(params)
  const url = `${searchURL}?${queryString}`

console.log(url);

fetch(url)
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    })
  }


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val()
    const maxResults = $('#js-max-results').val()
    getParks(searchTerm, maxResults);
  });
}
$(watchForm);
