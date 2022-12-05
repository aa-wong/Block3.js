import XMLParser from './xml-json-parser';

const Method = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  _: {
    successCodes: {
      GET: 200,
      POST: 200,
      PUT: 200,
      PATCH: 200,
      DELETE: 200
    },
    createSuccess: {
      POST: 201,
      PUT: 201,
      PATCH: 201
    }
  }
});

const httpSession = (xhr, request, callbacks) => {
  return new Promise((resolve, reject) => {
    let { method, url, headers, body } = request;

    if (!(method in Method)) {
      return reject(new Error('Invalid method supplied.'));
    }
    const successCode = !body ? Method._.successCodes[method] : Method._.createSuccess[method];

    xhr.onload = async () => {
      try {
        let res = xhr.response;

        if (xhr.responseXML) {
          res = XMLParser(xhr.responseXML.documentElement);
        } else if (res && res.constructor === String) {
          res = await JSON.parse(res);
        }

        if (xhr.status === successCode) {
          return resolve(res);
        }

        if (res) {
          const e = new Error(res.message);

          e.description = res.description;
          e.status = res.status_code;
          return reject(e);
        }
      } catch (e) {
        return reject(e);
      }

      return reject(xhr.statusText);
    };

    xhr.onprogress = e => {
      const cb = callbacks.onProgress;

      if (cb) {
        return cb(e);
      }
    };

    xhr.onabort = () => {
      return reject(new Error('Request aborted'));
    };

    xhr.onerror = e => {
      return reject(e);
    };

    xhr.ontimeout = e => {
      return reject(e);
    };

    xhr.upload.onprogress = e => {
      const cb = callbacks.onProgress;

      if (cb) {
        return cb(e);
      }
    };

    xhr.upload.onerror = e => {
      return reject(e);
    };

    xhr.open(method || Method.GET, url, true);

    if (headers && headers.constructor === Object) {
      for (let key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }
    }

    if (body && headers['Content-Type']) {
      if (headers['Content-Type'] === 'application/x-www-form-urlencoded' && typeof body !== 'string') {
        return reject(new Error('Invalid body format.'));
      } else if (headers['Content-Type'].includes('application/json')) {
        if (body.constructor === Object || Array.isArray(body)) {
          body = JSON.stringify(body);
        } else if (typeof body !== 'string') {
          return reject(new Error('Invalid body format.'));
        }
      }
    }

    xhr.send(body);
  });
};

const queryConstructor = (queries) => {
  if (queries && queries.constructor === Object) {
    return Object.keys(queries).reduce((a, k, i) => {
      a += i > 0 ? `&${k}=${queries[k]}` : `?${k}=${queries[k]}`;
      return a;
    }, '');
  }
  return '';
};

class Http {
  /**
   * Constructor Method
   * @param {Object} options options to apply on initialization
   */
  constructor(options = {}) {
    this._ = {};
    Object.keys(options).forEach(prop => this._[prop] = options[prop]);
    this._callbacks = {};
  }

  /**
   * PROPERTIES
   */

  /**
   * Host Getter
   * @return {String} host string
   */
  get host() {
    return !this._.host ? '' : this._.host;
  }

  /**
   * Host Setter
   * @param  {String} url string argument to set as host property
   */
  set host(url) {
    if (url && url.constructor === String) {
      this._.host = url;
    }
  }

  /**
   * Headers Getter
   * @return {{String : Sting}} headers object
   */
  get headers() {
    return !this._.headers ? {} : this._.headers;
  }

  /**
   * Headers Setter
   * @param  {{String : Sting}} headers object argument to set as headers property
   */
  set headers(headers) {
    if (headers && headers.constructor === Object) {
      this._.headers = headers;
    }
  }

  /**
   * XMLHttpRequest Getter
   * @return {XMLHttpRequest} XMLHttpRequest object to handle all HTTP request calls
   */
  get xhr() {
    if (!this._.xhr) {
      this._.xhr = new XMLHttpRequest();
    }
    return this._.xhr;
  }

  /**
   * XMLHttpRequest Setter
   * @param  {XMLHttpRequest} xhr XMLHttpRequest object to set as xhr property
   */
  set xhr(xhr) {
    if (xhr && xhr.constructor === XMLHttpRequest) {
      this._.xhr = xhr;
    }
  }

  /**
   * REQUEST METHODS
   */

  /**
   * GET requester method
   * @param  {String}             url     URI string to append to host.
   * @param  {{String : Sting}}   headers headers to append the baseHeaders
   * @param  {{String : Sting}}   queries queries to append to url
   * @return {Promise}            promise object to be fulfilled in request
   */
  get(url, headers, queries) {
    return this.fetch({
      method: Method.GET,
      url: url,
      headers: headers,
      queries: queries
    });
  }

  /**
   * POST requester method
   * @param  {String}             url     URI string to append to host.
   * @param  {{String : Sting}}   headers headers to append the baseHeaders
   * @param  {Any}                body    body to send in request
   * @param  {{String : Sting}}   queries queries to append to url
   * @return {Promise}                    promise object to be fulfilled in request
   */
  post(url, headers, body, queries) {
    return this.fetch({
      method: Method.POST,
      url: url,
      headers: headers,
      body: body,
      queries: queries
    });
  }

  /**
   * PUT requester method
   * @param  {String}             url     URI string to append to host.
   * @param  {{String : Sting}}   headers headers to append the baseHeaders
   * @param  {Any}                body    body to send in request
   * @param  {{String : Sting}}   queries queries to append to url
   * @return {Promise}                    promise object to be fulfilled in request
   */
  put(url, headers, body, queries) {
    return this.fetch({
      method: Method.PUT,
      url: url,
      headers: headers,
      body: body,
      queries: queries
    });
  }

  /**
   * PATCH requester method
   * @param  {String}             url     URI string to append to host.
   * @param  {{String : Sting}}   headers headers to append the baseHeaders
   * @param  {Any}                body    body to send in request
   * @param  {{String : Sting}}   queries queries to append to url
   * @return {Promise}                    promise object to be fulfilled in request
   */
  patch(url, headers, body, queries) {
    return this.fetch({
      method: Method.PATCH,
      url: url,
      headers: headers,
      body: body,
      queries: queries
    });
  }

  /**
   * DELETE requester method
   * @param  {String}             url     URI string to append to host.
   * @param  {{String : Sting}}   headers headers to append the baseHeaders
   * @param  {{String : Sting}}   queries queries to append to url
   * @return {Promise}                    promise object to be fulfilled in request
   */
  delete(url, headers, queries) {
    return this.fetch({
      method: Method.DELETE,
      url: url,
      headers: headers,
      queries: queries
    });
  }

  /**
   * FETCH requester method
   * @param  {Object} request parameters for fetch request
   * @return {Promise} promise object to be fulfilled in request
   */
  fetch(request) {
    return new Promise(async (resolve, reject) => {
      const { url, headers } = request;

      request.url = `${this.host}${url}`;
      if (this.headers) {
        request.headers = Object.assign({}, this.headers, headers);
      }

      if (request.queries) {
        request.url = request.url.concat(queryConstructor(request.queries));
        delete request.queries;
      }
      this._handleRequest(request);

      try {
        const res = await httpSession(this.xhr, request, this._callbacks);

        this._handleSuccess(res);
        return resolve(res);
      } catch (e) {
        this._handleError(e);
        return reject(e);
      }
    });
  }

  /**
   * EVENT HANDLER METHODS
   */

  /**
   * [onRequest description]
   * @param  {Function} cb [description]
   * @return {[type]}      [description]
   */
  onRequest(cb) {
    return this._applyCallback('onRequest', cb);
  }

  /**
   * [onError description]
   * @param  {Function} cb  Callback function that executes on request calls error
   * @return {Http}        Current Http Object
   */
  onError(cb) {
    return this._applyCallback('onError', cb);
  }

  /**
   * [onSuccess description]
   * @param  {Function} cb  Callback function that executes on request calls successes
   * @return {Http}        Current Http Object
   */
  onSuccess(cb) {
    return this._applyCallback('onSuccess', cb);
  }

  /**
   * [onProgress description]
   * @param  {Function} cb [description]
   * @return {[type]}      [description]
   */
  onProgress(cb) {
    return this._applyCallback('onProgress', cb);
  }

  /**
   * Internal Methods
   * @param  {String} key  Name of listener
   * @param  {Function} cb  Callback function that executes on request calls successes
   * @return {Http}        Current Http Object
   */
  _applyCallback(key, cb) {
    if (typeof cb === 'function') {
      this._callbacks[key] = e => cb(e);
    }

    return this;
  }

  _handleRequest(e) {
    const cb = this._callbacks.onRequest;

    if (cb) {
      return cb(e);
    }
  }

  _handleError(e) {
    const cb = this._callbacks.onError;

    if (cb) {
      return cb(e);
    }
  }

  _handleSuccess(e) {
    const cb = this._callbacks.onSuccess;

    if (cb) {
      return cb(e);
    }
  }
}

export default Http;
