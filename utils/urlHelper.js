// Ensure all URLs use HTTPS
export const ensureHttps = (url) => {
    if (typeof url !== 'string') return url;
    return url.replace('http://', 'https://');
};

// Helper to transform all image URLs in an object to HTTPS
export const transformImageUrls = (data) => {
    if (!data) return data;

    if (typeof data === 'string') {
        return ensureHttps(data);
    }

    if (Array.isArray(data)) {
        return data.map(transformImageUrls);
    }

    if (typeof data === 'object') {
        const transformed = {};
        for (const key in data) {
            if (key.toLowerCase().includes('image') || key.toLowerCase().includes('picture') || key.toLowerCase().includes('photo')) {
                transformed[key] = ensureHttps(data[key]);
            } else {
                transformed[key] = transformImageUrls(data[key]);
            }
        }
        return transformed;
    }

    return data;
};
