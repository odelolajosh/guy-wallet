const prefix = 'storage_';

const set = (key: string, value: any) => {
  if (value === null) {
    return remove(key);
  }
  localStorage.setItem(prefix + key, JSON.stringify(value));
}

const get = (key: string) => {
  const value = localStorage.getItem(prefix + key);
  return value ? JSON.parse(value) : null;
}

const remove = (key: string) => {
  localStorage.removeItem(prefix + key);
}

export const storage = {
  set,
  get,
  remove
};