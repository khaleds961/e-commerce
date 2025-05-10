export default function buildQueryString(params: Record<string, string | number | null>) {
    const validParams = Object.entries(params)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&');

    return validParams ? `?${validParams}` : '';
}