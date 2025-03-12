import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    setItem<users$>(key: string, value: users$): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem<users$>(key: string): users$ | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as users$ : null;
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}
