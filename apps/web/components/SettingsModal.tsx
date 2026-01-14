import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { StorageManager, UserSettings } from "@mantle/storage";

const storage = new StorageManager(true); // Usage of local storage for MVP

interface SettingsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSave: () => void;
}

export default function SettingsModal({ isOpen, closeModal, onSave }: SettingsModalProps) {
  const [provider, setProvider] = useState<"gemini" | "openai" | "claude">("gemini");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (isOpen) {
      storage.getSettings().then((settings) => {
        if (settings) {
          setProvider(settings.aiProvider);
          if (settings.aiProvider === "gemini") setApiKey(settings.geminiKey || "");
          if (settings.aiProvider === "openai") setApiKey(settings.openaiKey || "");
          if (settings.aiProvider === "claude") setApiKey(settings.claudeKey || "");
        }
      });
    }
  }, [isOpen]);

  const handleSave = async () => {
    const currentSettings = (await storage.getSettings()) || {} as UserSettings;
    const newSettings: UserSettings = {
      ...currentSettings,
      aiProvider: provider,
      geminiKey: provider === "gemini" ? apiKey : currentSettings.geminiKey,
      openaiKey: provider === "openai" ? apiKey : currentSettings.openaiKey,
      claudeKey: provider === "claude" ? apiKey : currentSettings.claudeKey,
    };
    await storage.saveSettings(newSettings);
    onSave();
    closeModal();
  };

  return (
    <Dialog as="div" className="relative z-10" open={isOpen} onClose={closeModal}>
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-700">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                    AI Settings
                </Dialog.Title>
                <div className="mt-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">AI Provider</label>
                        <select
                            value={provider}
                            onChange={(e) => setProvider(e.target.value as any)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="gemini">Google Gemini</option>
                            <option value="openai">OpenAI (GPT-4)</option>
                            <option value="claude">Anthropic (Claude)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">API Key</label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder={`Enter your ${provider} API Key`}
                        />
                         <p className="text-xs text-gray-500 mt-1">Keys are stored locally in your browser.</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </Dialog.Panel>
        </div>
    </Dialog>
  );
}
