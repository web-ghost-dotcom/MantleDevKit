'use client';

import * as React from 'react';
import { StorageManager, UserSettings } from '@mantle/storage';

interface SettingsContextType {
    settings: UserSettings;
    saveSettings: (settings: UserSettings) => Promise<void>;
    isOpen: boolean;
    openSettings: () => void;
    closeSettings: () => void;
}

const defaultSettings: UserSettings = {
    aiProvider: 'gemini',
};

const SettingsContext = React.createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = React.useState<UserSettings>(defaultSettings);
    const [isOpen, setIsOpen] = React.useState(false);
    const [storage] = React.useState(() => new StorageManager(true)); // Use local storage for now

    React.useEffect(() => {
        storage.getSettings().then((s) => {
            if (s) setSettings(s);
        });
    }, [storage]);

    const saveSettings = async (newSettings: UserSettings) => {
        await storage.saveSettings(newSettings);
        setSettings(newSettings);
    };

    return (
        <SettingsContext.Provider
            value={{
                settings,
                saveSettings,
                isOpen,
                openSettings: () => setIsOpen(true),
                closeSettings: () => setIsOpen(false)
            }}
        >
            {children}
            {isOpen && <SettingsModal />}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => {
    const context = React.useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

function SettingsModal() {
    const { settings, saveSettings, closeSettings } = useSettings();
    const [localSettings, setLocalSettings] = React.useState(settings);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-md bg-gray-900 border-2 border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-white uppercase tracking-wider">Settings</h2>
                    <button onClick={closeSettings} className="text-gray-500 hover:text-white text-xl">×</button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">AI Provider</label>
                        <select
                            value={localSettings.aiProvider}
                            onChange={(e) => setLocalSettings({ ...localSettings, aiProvider: e.target.value as any })}
                            className="w-full bg-gray-950 border-2 border-gray-700 px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="gemini">Google Gemini (Recommended)</option>
                            <option value="openai">OpenAI (GPT-4)</option>
                            <option value="claude">Anthropic (Claude 3)</option>
                        </select>
                    </div>

                    {localSettings.aiProvider === 'gemini' && (
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Gemini API Key</label>
                            <input
                                type="password"
                                value={localSettings.geminiKey || ''}
                                onChange={(e) => setLocalSettings({ ...localSettings, geminiKey: e.target.value })}
                                className="w-full bg-gray-950 border-2 border-gray-700 px-3 py-2 text-white font-mono text-sm focus:border-blue-500 focus:outline-none"
                                placeholder="AIza..."
                            />
                            <p className="mt-2 text-xs text-gray-600">
                                Get your key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" className="text-blue-500 hover:underline">aistudio.google.com</a>
                            </p>
                        </div>
                    )}

                    {localSettings.aiProvider === 'openai' && (
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">OpenAI API Key</label>
                            <input
                                type="password"
                                value={localSettings.openaiKey || ''}
                                onChange={(e) => setLocalSettings({ ...localSettings, openaiKey: e.target.value })}
                                className="w-full bg-gray-950 border-2 border-gray-700 px-3 py-2 text-white font-mono text-sm focus:border-blue-500 focus:outline-none"
                                placeholder="sk-..."
                            />
                            <p className="mt-2 text-xs text-gray-600">
                                Get your key at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener" className="text-blue-500 hover:underline">platform.openai.com</a>
                            </p>
                        </div>
                    )}

                    {localSettings.aiProvider === 'claude' && (
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Anthropic API Key</label>
                            <input
                                type="password"
                                value={localSettings.claudeKey || ''}
                                onChange={(e) => setLocalSettings({ ...localSettings, claudeKey: e.target.value })}
                                className="w-full bg-gray-950 border-2 border-gray-700 px-3 py-2 text-white font-mono text-sm focus:border-blue-500 focus:outline-none"
                                placeholder="sk-ant-..."
                            />
                            <p className="mt-2 text-xs text-gray-600">
                                Get your key at <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener" className="text-blue-500 hover:underline">console.anthropic.com</a>
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={closeSettings}
                        className="flex-1 py-2 text-sm font-bold border-2 border-gray-700 text-gray-400 hover:text-white hover:border-gray-600"
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={() => { saveSettings(localSettings); closeSettings(); }}
                        className="flex-1 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white"
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    );
}
