// IndexedDB utility for storing large document previews
// Uses IndexedDB instead of localStorage/sessionStorage to avoid quota issues

const DB_NAME = 'SchoolManagementDB';
const STORE_NAME = 'documentPreviews';
const DB_VERSION = 1;

let dbInstance = null;

// Initialize IndexedDB
const initDB = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

// Get DB instance or initialize if needed
const getDB = async () => {
  if (!dbInstance) {
    await initDB();
  }
  return dbInstance;
};

// Save document data (both files and previews) to IndexedDB
export const saveDocumentData = async (documentData) => {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.put(documentData, 'documentData');
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(documentData);
    });
  } catch (error) {
    console.error('Failed to save document data to IndexedDB:', error);
    throw error;
  }
};

// Save document previews to IndexedDB (backward compatibility)
export const saveDocumentPreviews = async (previews) => {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.put(previews, 'documentPreviews');
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(previews);
    });
  } catch (error) {
    console.error('Failed to save document previews to IndexedDB:', error);
    throw error;
  }
};

// Load document data (both files and previews) from IndexedDB
export const loadDocumentData = async () => {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get('documentData');
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        resolve(request.result || null);
      };
    });
  } catch (error) {
    console.error('Failed to load document data from IndexedDB:', error);
    return null;
  }
};

// Load document previews from IndexedDB (backward compatibility)
export const loadDocumentPreviews = async () => {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get('documentPreviews');
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        resolve(request.result || null);
      };
    });
  } catch (error) {
    console.error('Failed to load document previews from IndexedDB:', error);
    return null;
  }
};

// Clear document data
export const clearDocumentData = async () => {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.delete('documentData');
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error('Failed to clear document data:', error);
  }
};

// Clear document previews (backward compatibility)
export const clearDocumentPreviews = async () => {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.delete('documentPreviews');
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error('Failed to clear document previews:', error);
  }
};
