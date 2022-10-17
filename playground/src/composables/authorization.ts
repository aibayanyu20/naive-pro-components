export const STORAGE_TOKEN_KEY = 'Authorization'

export const useAuthorization = createGlobalState(() => useStorage(STORAGE_TOKEN_KEY, ''))
