export function toFormData(values: any) {
    const formData = new FormData();
    formData.set("data", JSON.stringify(values));
    return formData;
}

export async function parseRequest<T = any>(request: Request): Promise<T> {
    return parseFormData(await request.formData());
}

export function parseFormData(formData: FormData) {
    const values = formData.get("data");
    if (values) {
        return JSON.parse(values as string);
    }
    return null;
}
