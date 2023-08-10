//MemoryLeaks.js

function MemoryLeaks() {
  // Track references to objects that might cause memory leaks
  this.leakObjects = [];
  // Track registered event listeners
  this.eventListeners = [];
  this.eventListeners = new Map();
}

MemoryLeaks.prototype.addLeakObject = function (object) {
  this.leakObjects.push(object);
};

MemoryLeaks.prototype.removeLeakObjects = function () {
  // Clear references to leak objects to help them become eligible for garbage collection
  this.leakObjects = [];
};

MemoryLeaks.prototype.addManagedEventListener = function (target, event, handler, options) {
  target.addEventListener(event, handler, options);
  // Store event listener details for later removal
  this.eventListeners.push({ target, event, handler, options });
};

MemoryLeaks.prototype.removeManagedEventListeners = function () {
  // Remove all registered event listeners
  this.eventListeners.forEach(({ target, event, handler, options }) => {
    target.removeEventListener(event, handler, options);
  });
  // Clear the stored event listener details
  this.eventListeners = [];
};

MemoryLeaks.prototype.addDuplicateEventListener = function (target, eventType, listener) {
  const eventKey = `${target.toString()}_${eventType}`;

  if (!this.eventListeners.has(eventKey)) {
    this.eventListeners.set(eventKey, []);
  }

  this.eventListeners.get(eventKey).push(listener);
};

MemoryLeaks.prototype.detectDuplicateEventListeners = function () {
  this.eventListeners.forEach((listeners, eventKey) => {
    if (listeners.length > 1) {
      console.warn(`Possible duplicate event listeners for ${eventKey}:`, listeners);
    }
  });
};

MemoryLeaks.prototype.removeDuplicateEventListeners = function () {
  this.eventListeners.forEach((listeners, eventKey) => {
    if (listeners.length > 1) {
      const uniqueListeners = Array.from(new Set(listeners));
      this.eventListeners.set(eventKey, uniqueListeners);
    }
  });
};





export { MemoryLeaks };
