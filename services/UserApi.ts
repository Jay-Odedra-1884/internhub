export const getUsersDetail = async () => {
    const response = await fetch("/api/user", {
        method:"GET"
    });
    const data = await response.json();
    return data;
}