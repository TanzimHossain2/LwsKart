export const sanitizeData = (data: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== '' && value !== undefined)
    );
  };
