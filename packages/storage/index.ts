import Dexie, { Table } from 'dexie';

export interface Project {
    id?: number;
    name: string;
    contractCode: string;
    abi: any[];
    address?: string;
    createdAt: Date;
}

export interface UserSettings {
    id?: number;
    aiProvider: "gemini" | "openai" | "claude";
    geminiKey?: string;
    openaiKey?: string;
    claudeKey?: string;
}

class MantleDB extends Dexie {
    projects!: Table<Project>;
    settings!: Table<UserSettings>;

    constructor() {
        super('MantleDevKitDB');
        this.version(1).stores({
            projects: '++id, name',
            settings: '++id'
        });
    }
}

export class StorageManager {
    private db: MantleDB;
    private useLocalStorage: boolean;

    constructor(useLocalStorage = false) {
        this.useLocalStorage = useLocalStorage;
        this.db = new MantleDB();
    }

    async saveProject(project: Project): Promise<number> {
        if (this.useLocalStorage) {
            const projects = JSON.parse(localStorage.getItem('mantle_projects') || '[]');
            const newId = projects.length + 1;
            projects.push({ ...project, id: newId });
            localStorage.setItem('mantle_projects', JSON.stringify(projects));
            return newId;
        } else {
            return await this.db.projects.add(project) as number;
        }
    }

    async getProjects(): Promise<Project[]> {
        if (this.useLocalStorage) {
            return JSON.parse(localStorage.getItem('mantle_projects') || '[]');
        } else {
            return await this.db.projects.toArray();
        }
    }

    async deleteProject(id: number): Promise<void> {
        if (this.useLocalStorage) {
            const projects = JSON.parse(localStorage.getItem('mantle_projects') || '[]');
            const filtered = projects.filter((p: Project) => p.id !== id);
            localStorage.setItem('mantle_projects', JSON.stringify(filtered));
        } else {
            await this.db.projects.delete(id);
        }
    }

    async completeQuest(questId: string): Promise<void> {
        const completed = JSON.parse(localStorage.getItem('mantle_quests') || '[]');
        if (!completed.includes(questId)) {
            completed.push(questId);
            localStorage.setItem('mantle_quests', JSON.stringify(completed));
        }
    }

    getCompletedQuests(): string[] {
        return JSON.parse(localStorage.getItem('mantle_quests') || '[]');
    }

    async saveSettings(settings: UserSettings): Promise<void> {
        if (this.useLocalStorage) {
            localStorage.setItem('mantle_settings', JSON.stringify(settings));
        } else {
            await this.db.settings.put({ ...settings, id: 1 });
        }
    }

    async getSettings(): Promise<UserSettings | undefined> {
        if (this.useLocalStorage) {
            const s = localStorage.getItem('mantle_settings');
            return s ? JSON.parse(s) : undefined;
        } else {
            return await this.db.settings.get(1);
        }
    }
}
