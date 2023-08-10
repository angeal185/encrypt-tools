// main.js
import { MalwareDetector } from './malwareDetector.js';
import { NetworkMonitor } from './networkMonitor.js';
import { FileMonitor } from './fileMonitor.js';
import { MemoryLeaks } from './MemoryLeaks.js';

// Example usage
const adContainerId = 'ad-container';
const scanInterval = 60000;
const monitoredDomains = ['malicious.com', 'suspicious.net'];
const directoryPath = '/path/to/your/directory';

const malwareDetector = new MalwareDetector(adContainerId, scanInterval);
malwareDetector.scanAdContainer(); // Example method call

const networkMonitor = new NetworkMonitor(monitoredDomains);
networkMonitor.startMonitoring(); // Example method call

const fileMonitor = new FileMonitor(directoryPath, scanInterval);
fileMonitor.arrayBufferToHex(); // Example method call
