export const fetchTopics = async () => {
    const res = await fetch('http://localhost:5000/api/topics');
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Ошибка загрузки тем: ${text}`);
    }
    return await res.json();
};