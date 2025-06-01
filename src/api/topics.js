

export async function fetchTopics() {
    try {
        const response = await fetch(`http://localhost:5000/api/topics/`);

        if (!response.ok) {
            throw new Error('Ошибка при загрузке тем');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
