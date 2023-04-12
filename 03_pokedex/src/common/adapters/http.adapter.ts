


export abstract class HttpAdapter {
    abstract get<T = any>(url: string): Promise<T>
}


