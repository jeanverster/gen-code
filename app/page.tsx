"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Editor } from "@monaco-editor/react";
import { Code2, Copy, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { ProgrammingLanguage } from "./types";
import { codeExamples } from "./utils/codeExamples";

const style = "Gen Z"; // Hardcoded to Gen Z

export default function Home() {
  const [code, setCode] = useState("");
  const [transformedCode, setTransformedCode] = useState("");
  const [language, setLanguage] = useState<ProgrammingLanguage>("JavaScript");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setCode(codeExamples[language] || "");
  }, [language]);

  const handleTransform = async () => {
    if (!code) {
      toast({
        title: "Error",
        description: "Please enter some code to transform",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, style, language }),
      });

      if (!response.ok) {
        throw new Error("Failed to transform code");
      }

      const data = await response.json();

      const formattedCode =
        typeof data === "string" ? data.replace(/\\n/g, "\n") : data;

      setTransformedCode(formattedCode);

      toast({
        title: "Yasss Queen! 💅",
        description: "Code is now bussin' fr fr!",
      });
    } catch (error) {
      toast({
        title: "Big Yikes!",
        description: "That transformation was not it, chief",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transformedCode);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy code",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Code Vibe Translator 💯</h1>
          <p className="text-gray-600">
            Transform your boring code into Gen Z slang that's absolutely
            bussin' no cap fr fr
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Select
                value={language}
                onValueChange={(value) =>
                  setLanguage(value as ProgrammingLanguage)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="TypeScript">TypeScript</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                  <SelectItem value="C++">C++</SelectItem>
                  <SelectItem value="Ruby">Ruby</SelectItem>
                  <SelectItem value="Go">Go</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-[400px] border rounded-lg overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage={language.toLowerCase()}
                language={language.toLowerCase()}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: true,
                  scrollBeyondLastLine: false,
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>

            <Button
              onClick={handleTransform}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Vibing...
                </>
              ) : (
                <>
                  <Code2 className="mr-2 h-4 w-4" />
                  Make It Bussin' 🔥
                </>
              )}
            </Button>

            {transformedCode && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Gen Z Code Slaps 💯</h2>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Yoink
                  </Button>
                </div>

                <div className="h-[400px] border rounded-lg overflow-hidden">
                  <Editor
                    height="100%"
                    defaultLanguage={language.toLowerCase()}
                    value={transformedCode}
                    theme="vs-dark"
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: "on",
                      roundedSelection: true,
                      scrollBeyondLastLine: false,
                      padding: { top: 16, bottom: 16 },
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
