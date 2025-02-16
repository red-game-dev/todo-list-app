export async function handleApiError(response: Response): Promise<never> {
  let errorMessage: string;

  try {
    const errorData = await response.json();
    errorMessage = errorData.error || response.statusText;
  } catch {
    errorMessage = response.statusText;
  }

  const error = new Error(errorMessage);
  (error as any).status = response.status;
  throw error;
}
