"use client";

import { useState, useEffect, useTransition } from "react";
import { Bot, Eye, EyeOff, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminGetSetting, adminSaveSetting } from "@/actions/admin";

export function AiApiKeyForm() {
  const [apiKey, setApiKey] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [model, setModel] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    Promise.all([
      adminGetSetting("ai_api_key"),
      adminGetSetting("ai_endpoint"),
      adminGetSetting("ai_model"),
    ]).then(([key, ep, mdl]) => {
      if (key) setApiKey(key);
      if (ep) setEndpoint(ep);
      if (mdl) setModel(mdl);
    });
  }, []);

  function handleSave(key: string, value: string) {
    startTransition(async () => {
      await adminSaveSetting(key, value);
      setSaved(key);
      setTimeout(() => setSaved(null), 2000);
    });
  }

  return (
    <div className="mb-6 bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-violet-50 text-violet-600">
          <Bot size={20} />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">
            Configuração de IA
          </h2>
          <p className="text-xs text-gray-500">
            Configure a API, endpoint e modelo do assistente IA
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* API Key */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Chave de API
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={showKey ? "text" : "password"}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => handleSave("ai_api_key", apiKey)}
              disabled={isPending}
              className="gap-1.5"
            >
              {saved === "ai_api_key" ? (
                <Check size={16} />
              ) : (
                <Save size={16} />
              )}
              {saved === "ai_api_key" ? "Salvo" : "Salvar"}
            </Button>
          </div>
        </div>

        {/* Endpoint */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Endpoint
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="https://api.openai.com/v1"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="primary"
              size="md"
              onClick={() => handleSave("ai_endpoint", endpoint)}
              disabled={isPending}
              className="gap-1.5"
            >
              {saved === "ai_endpoint" ? (
                <Check size={16} />
              ) : (
                <Save size={16} />
              )}
              {saved === "ai_endpoint" ? "Salvo" : "Salvar"}
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            URL base da API (OpenAI, Azure, Custom, etc.)
          </p>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Modelo
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="gpt-4o-mini, gpt-4o, gemini-pro..."
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="primary"
              size="md"
              onClick={() => handleSave("ai_model", model)}
              disabled={isPending}
              className="gap-1.5"
            >
              {saved === "ai_model" ? <Check size={16} /> : <Save size={16} />}
              {saved === "ai_model" ? "Salvo" : "Salvar"}
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Nome do modelo de IA a ser utilizado
          </p>
        </div>
      </div>
    </div>
  );
}
