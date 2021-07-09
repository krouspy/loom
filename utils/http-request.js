const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const postRequest = async (uri, body) => {
  return fetch(uri, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then(res => res.json());
};
