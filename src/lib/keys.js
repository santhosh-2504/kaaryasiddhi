// export function getRapidApiKeys() {
//   return JSON.parse(localStorage.getItem("rapidapi_keys")) || [];
// }

// export function getSelectedKeyIndex() {
//   return parseInt(localStorage.getItem("selected_rapidapi_key_index"), 10);
// }

// export function getActiveKey() {
//   const keys = getRapidApiKeys();
//   const index = getSelectedKeyIndex();
//   return keys[index] || null;
// }

// export function incrementKeyUsage(index) {
//   const keys = getRapidApiKeys();
//   const today = new Date().toISOString().split("T")[0];

//   if (!keys[index]) return;

//   if (keys[index].lastUsed === today) {
//     keys[index].usedToday += 1;
//   } else {
//     keys[index].usedToday = 1;
//     keys[index].lastUsed = today;
//   }

//   localStorage.setItem("rapidapi_keys", JSON.stringify(keys));
// }

// Utility functions for managing RapidAPI keys in localStorage

export function isClientSide() {
  return typeof window !== "undefined";
}

export function getRapidApiKeys() {
  if (!isClientSide()) return [];

  try {
    const keys = localStorage.getItem("rapidapi_keys");
    return keys ? JSON.parse(keys) : [];
  } catch (error) {
    console.error("Error reading RapidAPI keys:", error);
    return [];
  }
}

export function getSelectedKeyIndex() {
  if (!isClientSide()) return null;

  try {
    const index = localStorage.getItem("selected_rapidapi_key_index");
    const parsedIndex = parseInt(index, 10);
    return Number.isInteger(parsedIndex) ? parsedIndex : null;
  } catch (error) {
    console.error("Error reading selected key index:", error);
    return null;
  }
}

export function getActiveKey() {
  if (!isClientSide()) return null;

  const keys = getRapidApiKeys();
  const index = getSelectedKeyIndex();

  if (keys.length === 0) return null;
  if (index === null || index < 0 || index >= keys.length) {
    // Auto-select first key if no valid selection
    setSelectedKeyIndex(0);
    return keys[0] || null;
  }

  return keys[index] || null;
}

export function setSelectedKeyIndex(index) {
  if (!isClientSide()) return;

  try {
    if (index === null || index === undefined) {
      localStorage.removeItem("selected_rapidapi_key_index");
    } else {
      localStorage.setItem("selected_rapidapi_key_index", index.toString());
    }
  } catch (error) {
    console.error("Error setting selected key index:", error);
  }
}

export function incrementKeyUsage(index) {
  if (!isClientSide()) return;

  const keys = getRapidApiKeys();
  const today = new Date().toISOString().split("T")[0];

  if (!keys[index]) {
    console.warn(`No API key found at index ${index}`);
    return;
  }

  try {
    // Create a copy to avoid mutations
    const updatedKeys = [...keys];

    if (updatedKeys[index].lastUsed === today) {
      updatedKeys[index].usedToday += 1;
    } else {
      updatedKeys[index].usedToday = 1;
      updatedKeys[index].lastUsed = today;
    }

    localStorage.setItem("rapidapi_keys", JSON.stringify(updatedKeys));
  } catch (error) {
    console.error("Error incrementing key usage:", error);
  }
}

export function saveRapidApiKeys(keys) {
  if (!isClientSide()) return;

  try {
    localStorage.setItem("rapidapi_keys", JSON.stringify(keys));
  } catch (error) {
    console.error("Error saving RapidAPI keys:", error);
  }
}

export function validateKeyStructure(keyObj) {
  return (
    keyObj &&
    typeof keyObj.label === "string" &&
    typeof keyObj.key === "string" &&
    typeof keyObj.usedToday === "number" &&
    typeof keyObj.lastUsed === "string"
  );
}

export function migrateOldKeys() {
  if (!isClientSide()) return;

  try {
    const stored = getRapidApiKeys();
    if (stored.length === 0) return;

    // Check if migration is needed (old format was array of strings)
    if (typeof stored[0] === "string") {
      const today = new Date().toISOString().split("T")[0];
      const migratedKeys = stored.map((key, index) => ({
        label: `Key ${index + 1}`,
        key: key,
        usedToday: 0,
        lastUsed: today,
      }));

      saveRapidApiKeys(migratedKeys);
      console.log("Migrated old API keys to new format");
    }
  } catch (error) {
    console.error("Error migrating old keys:", error);
  }
}
