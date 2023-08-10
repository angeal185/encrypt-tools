// NetworkMonitor.js

// NetworkMonitor constructor
function NetworkMonitor(monitoredDomains, whitelistDomains) {
  this.monitoredDomains = monitoredDomains || [];
  this.whitelistDomains = whitelistDomains || [];
  this.websocketConnections = [];
  this.requestLog = [];
  this.originalXHROpen = XMLHttpRequest.prototype.open;
}

NetworkMonitor.prototype.arrayBufferToHex = function (arrayBuffer) {
  const byteArray = new Uint8Array(arrayBuffer);
  const hexParts = [];
  for (const byte of byteArray) {
    hexParts.push(byte.toString(16).padStart(2, '0'));
  }
  return hexParts.join('');
};

NetworkMonitor.prototype.calculateRequestHash = async function (request) {
  const requestData = `${request.method}-${request.url}-${request.initiatedAt}`;
  const buffer = new TextEncoder().encode(requestData);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  return this.arrayBufferToHex(hashBuffer);
};

NetworkMonitor.prototype.isDomainWhitelisted = function (url) {
  const hostname = new URL(url).hostname;
  return this.whitelistDomains.some(domain => hostname.endsWith(domain));
};

NetworkMonitor.prototype.startMonitoring = function () {
  const self = this;

  // Intercept fetch requests to monitor outgoing network requests
  window.fetch = function (...args) {
    const requestTime = new Date();
    const requestDetails = {
      method: args[1]?.method || 'GET',
      url: args[0],
      initiatedAt: requestTime
    };

    return originalFetch.apply(this, args).then(response => {
      const responseTime = new Date();
      const responseDetails = {
        status: response.status,
        statusText: response.statusText,
        receivedAt: responseTime
      };

      // Log request and response details
      const logEntry = {
        request: requestDetails,
        response: responseDetails
      };
      self.requestLog.push(logEntry);

      return response;
    });
  };

  // Intercept XMLHttpRequest to monitor outgoing network requests
  window.XMLHttpRequest.prototype.open = function (...args) {
    const requestTime = new Date();
    const requestDetails = {
      method: args[0] || 'GET',
      url: args[1],
      initiatedAt: requestTime
    };

    this.addEventListener('load', function () {
      const responseTime = new Date();
      const responseDetails = {
        status: this.status,
        statusText: this.statusText,
        receivedAt: responseTime
      };

      // Log request and response details
      const logEntry = {
        request: requestDetails,
        response: responseDetails
      };
      self.requestLog.push(logEntry);
    });

    return self.originalXHROpen.apply(this, args);
  };
};

NetworkMonitor.prototype.blockNonWhitelistedRequests = function () {
  const self = this;

  // Block fetch requests not conforming to the whitelist
  window.fetch = function (...args) {
    if (!self.isDomainWhitelisted(args[0])) {
      console.warn('Blocked non-whitelisted request:', args[0]);
      // Perform actions on blocking, e.g., prevent the request or notify user
      return new Promise((resolve, reject) => {
        reject(new Error('Blocked non-whitelisted request'));
      });
    }
    return originalFetch.apply(this, args);
  };

  // Block XMLHttpRequests not conforming to the whitelist
  window.XMLHttpRequest.prototype.open = function (...args) {
    if (!self.isDomainWhitelisted(args[1])) {
      console.warn('Blocked non-whitelisted request:', args[1]);
      // Perform actions on blocking, e.g., prevent the request or notify user
      return;
    }
    return self.originalXHROpen.apply(this, args);
  };
};

NetworkMonitor.prototype.monitorWebSockets = function () {
  const self = this;

  // Intercept WebSocket constructor to monitor WebSocket connections
  const originalWebSocket = window.WebSocket;
  window.WebSocket = function (...args) {
    const websocket = new originalWebSocket(...args);

    // Log the WebSocket connection
    self.websocketConnections.push(websocket);

    // Intercept and log messages sent and received
    const originalSend = websocket.send;
    websocket.send = function (data) {
      console.log('WebSocket send:', data);
      return originalSend.apply(this, arguments);
    };

    websocket.addEventListener('message', function (event) {
      console.log('WebSocket received:', event.data);
    });

    return websocket;
  };
};

NetworkMonitor.prototype.preventDataLeakage = function () {
  const self = this;

  // Intercept outgoing requests to inspect data
  const originalFetch = window.fetch;
  window.fetch = function (...args) {
    if (self.isDomainWhitelisted(args[0])) {
      // Perform DLP checks on outgoing data
      const requestData = args[1]?.body;
      if (requestData && self.detectSensitiveData(requestData)) {
        console.warn('Blocked request containing sensitive data:', args[0]);
        // Perform actions on blocking, e.g., prevent the request or notify user
        return new Promise((resolve, reject) => {
          reject(new Error('Blocked request containing sensitive data'));
        });
      }
    }
    return originalFetch.apply(this, args);
  };

  // Intercept outgoing XMLHttpRequests to inspect data
  const originalOpen = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function (...args) {
    if (self.isDomainWhitelisted(args[1])) {
      const requestData = this.sendData;
      if (requestData && self.detectSensitiveData(requestData)) {
        console.warn('Blocked request containing sensitive data:', args[1]);
        // Perform actions on blocking, e.g., prevent the request or notify user
        return;
      }
    }
    return originalOpen.apply(this, args);
  };

  // Intercept and log data sent via XMLHttpRequest
  const originalSend = window.XMLHttpRequest.prototype.send;
  window.XMLHttpRequest.prototype.send = function (data) {
    this.sendData = data;
    return originalSend.apply(this, arguments);
  };
};

NetworkMonitor.prototype.detectSensitiveData = function (data) {
  // Implement your logic to detect sensitive data in the request payload
  // Return true if sensitive data is detected, otherwise return false
  // Example: Check for credit card numbers, social security numbers, etc.
  // You can use regular expressions or other methods for detection.
  // For simplicity, let's assume detection logic here.
  return data.includes('sensitive_data');
};

NetworkMonitor.prototype.expectResponseFormat = function (expectedContentType) {
  const self = this;

  // Intercept fetch requests to monitor outgoing network requests
  window.fetch = function (...args) {
    const requestTime = new Date();
    const requestDetails = {
      method: args[1]?.method || 'GET',
      url: args[0],
      initiatedAt: requestTime
    };

    return originalFetch.apply(this, args).then(response => {
      const responseTime = new Date();
      const responseDetails = {
        status: response.status,
        statusText: response.statusText,
        receivedAt: responseTime,
        contentType: response.headers.get('content-type')
      };

      // Log request and response details
      const logEntry = {
        request: requestDetails,
        response: responseDetails
      };
      self.requestLog.push(logEntry);

      if (self.isDomainWhitelisted(args[0]) && expectedContentType && responseDetails.contentType !== expectedContentType) {
        console.warn('Blocked response with unexpected content type:', args[0]);
        // Perform actions on blocking, e.g., prevent the request or notify user
        return new Promise((resolve, reject) => {
          reject(new Error('Blocked response with unexpected content type'));
        });
      }

      return response;
    });
  };
};

NetworkMonitor.prototype.throttleRequests = function (requestsPerMinute) {
  const self = this;
  const requestInterval = 60000 / requestsPerMinute; // Convert requests per minute to interval in milliseconds
  let lastRequestTime = 0;

  // Intercept fetch requests to monitor outgoing network requests
  window.fetch = function (...args) {
    const currentTime = new Date().getTime();

    // Check if the request is within the allowed interval
    if (currentTime - lastRequestTime < requestInterval) {
      console.warn(`Request throttled. Please wait before making another request.`);
      // Perform actions on throttling, e.g., prevent the request or notify user
      return new Promise((resolve, reject) => {
        reject(new Error(`Request throttled. Please wait before making another request.`));
      });
    }

    lastRequestTime = currentTime;

    // Continue with the fetch request
    const requestTime = new Date();
    const requestDetails = {
      method: args[1]?.method || 'GET',
      url: args[0],
      initiatedAt: requestTime
    };

    return originalFetch.apply(this, args).then(response => {
      const responseTime = new Date();
      const responseDetails = {
        status: response.status,
        statusText: response.statusText,
        receivedAt: responseTime,
        contentType: response.headers.get('content-type')
      };

      // Log request and response details
      const logEntry = {
        request: requestDetails,
        response: responseDetails
      };
      self.requestLog.push(logEntry);

      if (self.isDomainWhitelisted(args[0]) && expectedContentType && responseDetails.contentType !== expectedContentType) {
        console.warn('Blocked response with unexpected content type:', args[0]);
        // Perform actions on blocking, e.g., prevent the request or notify user
        return new Promise((resolve, reject) => {
          reject(new Error('Blocked response with unexpected content type'));
        });
      }

      return response;
    });
  };
};


NetworkMonitor.prototype.handleRedirections = function () {
  const self = this;

  // Intercept fetch requests to handle HTTP redirects
  window.fetch = function (...args) {
    return originalFetch.apply(this, args).then(response => {
      // Check if the response is a redirection
      if (response.redirected) {
        const originalRequestUrl = args[0];
        const redirectedUrl = response.url;

        console.log('Request redirected from:', originalRequestUrl);
        console.log('Redirected to:', redirectedUrl);

        // Perform actions on redirection, e.g., notify user or handle the new URL
        // You can also decide to follow the redirection and return another fetch promise
      }

      return response;
    });
  };

  // Intercept XMLHttpRequests to handle HTTP redirects
  window.XMLHttpRequest.prototype.open = function (...args) {
    const originalLoad = this.onload;
    this.onload = function () {
      if (self.isRedirect(this)) {
        const originalRequestUrl = args[1];
        const redirectedUrl = this.responseURL;

        console.log('Request redirected from:', originalRequestUrl);
        console.log('Redirected to:', redirectedUrl);

        // Perform actions on redirection, e.g., notify user or handle the new URL
        // You can also decide to follow the redirection and make another XMLHttpRequest
      }

      if (originalLoad) {
        originalLoad.apply(this, arguments);
      }
    };

    return self.originalXHROpen.apply(this, args);
  };
};

NetworkMonitor.prototype.isRedirect = function (xhr) {
  return xhr.status >= 300 && xhr.status < 400 && xhr.responseURL !== xhr.openArgs[1];
};


NetworkMonitor.prototype.monitorCertificates = function () {
  const self = this;

  // Intercept fetch requests to monitor HTTPS certificates
  window.fetch = function (...args) {
    return originalFetch.apply(this, args).then(response => {
      if (args[0].startsWith('https://')) {
        self.validateCertificate(args[0], response);
      }
      return response;
    });
  };

  // Intercept XMLHttpRequests to monitor HTTPS certificates
  window.XMLHttpRequest.prototype.open = function (...args) {
    const url = args[1];
    if (url.startsWith('https://')) {
      const xhr = this;

      const originalOnreadystatechange = xhr.onreadystatechange;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          self.validateCertificate(url, xhr);
        }
        if (originalOnreadystatechange) {
          originalOnreadystatechange.apply(this, arguments);
        }
      };
    }
    return self.originalXHROpen.apply(this, args);
  };
};

NetworkMonitor.prototype.validateCertificate = function (url, responseOrXhr) {
  const certificate = responseOrXhr.getResponseHeader('X-SSL-Certificate'); // Example header to retrieve the certificate
  if (certificate) {
    // Perform certificate validation and analysis
    // You can use libraries like "forge" or "jsrsasign" to parse and validate certificates
    const isValid = validateCertificate(certificate);

    if (!isValid) {
      console.warn('Invalid SSL certificate detected for:', url);
      // Perform actions on invalid certificate, e.g., notify user or take preventive measures
    }
  }
};

// Example function to validate the certificate (replace with appropriate library)
function validateCertificate(certificate) {
  // Your certificate validation logic here
  // Return true if the certificate is valid, false otherwise
  return true;
}

/*


Cross-Origin Resource Sharing (CORS) Analysis

IP Geolocation Tracking
Bandwidth Usage Monitoring
Real-time Notifications

Secure Content Loading
Custom Reporting and Logging
*/
export { NetworkMonitor };
