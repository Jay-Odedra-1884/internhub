export const getUserDetailById = async (id: string) => {
    const response = await fetch(`/api/user/${id}`, {
        method:"GET"
    });
    const data = await response.json();
    return data;
}