export async function getD<T>(
  fetchFuntion: () => Promise<T | null>
): Promise<T> {
  try {
    const data = await fetchFuntion();
    if (!data) {
      console.error("Data not found");
      throw new Error("Data not found");
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
}
