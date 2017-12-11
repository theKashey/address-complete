import isNode from 'detect-node'

let fetch;

if (isNode) {
  fetch = path => (
    new Promise((resolve, reject) => {
      const https = require('https');
      try {
        https.get(path, function (response) {
          let body = '';
          response.on('data', function (chunk) {
            body += chunk;
          });
          response.on('end', function () {
            try {
              resolve(JSON.parse(body));
            } catch (e) {
              reject(e);
            }
            body = '';
          });
        }).on('error', function (e) {
          reject(e);
        });
      } catch (e) {
        reject(e);
      }
    })
  )
} else {
  fetch = path => (
    new Promise((resolve, reject) => {
      console.log('open', path);

      const xhr = new XMLHttpRequest();
      xhr.open('GET', path, true);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 304) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch (e) {
              reject(e);
            }
          } else {
            reject(xhr);
          }
        }
      };

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send();
    })
  );
}

export default fetch;