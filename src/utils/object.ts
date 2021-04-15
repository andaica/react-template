export function cloneDeep<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

export function updateField(object: any, data: any): void {
  Object.keys(object).forEach((key) => {
    if (key in data && data[key] !== object[key]) {
      object[key] = data[key];
    }
  });
}
