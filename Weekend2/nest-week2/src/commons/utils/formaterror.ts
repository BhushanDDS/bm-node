export function formatError(error: any, parentPath = ''): any[] {
    const fieldPath = parentPath ? `${parentPath}.${error.property}` : error.property;
    const results = [];
  
    if (error.constraints) {
      for (const key of Object.keys(error.constraints)) {
        results.push({
          field: fieldPath,
          code: error.constraints[key],
        });
      }
    }
  
    if (error.children && error.children.length > 0) {
      error.children.forEach((child) => {
        results.push(...formatError(child, fieldPath));
      });
    }
  
    return results;
  }
  