export const commonParams = {};
export const commonHeaders = {};

export function post(url, body?) {
  return new Promise<any>((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...commonHeaders,
      },
      body: creteFormBody({...(body || {}), ...commonParams}),
    })
      .then((response) => response.json())
      .then((result: any) => {
        console.log('Fetch post:', url, body);
        console.log('Fetch result', result);
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function get(url, params?) {
  return new Promise<any>((resolve, reject) => {
    url = createGetUrl(url, params);
    url = createGetUrl(url, commonParams);
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...commonHeaders,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result: any) => {
        console.log('Fetch get:', url, params);
        console.log('Fetch result', result);
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function createGetUrl(url, params) {
  if (params) {
    const paramsArray = [];
    //拼接参数
    Object.keys(params).forEach((key) =>
      paramsArray.push(key + '=' + params[key]),
    );
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&');
    } else {
      url += '&' + paramsArray.join('&');
    }
  }
  return url;
}

function creteFormBody(data) {
  const formBody = [];
  for (let property in data) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  const result = formBody.join('&');
  return result;
}
