'use client';

import { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy, Code2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { GenerationStyle, ProgrammingLanguage } from './types';
import { codeExamples } from './utils/codeExamples';

export default function Home() {
  const [code, setCode] = useState('');
  const [transformedCode, setTransformedCode] = useState('');
  const [style, setStyle] = useState<GenerationStyle>('Gen Z');
  const [language, setLanguage] = useState<ProgrammingLanguage>('JavaScript');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setCode(codeExamples[language] || '');
  }, [language]);

  const handleTransform = async () => {
    if (!code) {
      toast({
        title: 'Error',
        description: 'Please enter some code to transform',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, style, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to transform code');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        result += decoder.decode(value);
        setTransformedCode(result);
      }

      toast({
        title: 'Success',
        description: 'Code transformed successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to transform code',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transformedCode);
      toast({
        title: 'Copied!',
        description: 'Code copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy code',
        variant: 'destructive',
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Code Style Transformer</h1>
          <p className="text-gray-600">
            Transform your code into different generational speaking styles
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

              <Select
                value={style}
                onValueChange={(value) => setStyle(value as GenerationStyle)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gen Z">Gen Z</SelectItem>
                  <SelectItem value="Millennial">Millennial</SelectItem>
                  <SelectItem value="Boomer">Boomer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-[400px] border rounded-lg overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage={language.toLowerCase()}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
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
                  Transforming...
                </>
              ) : (
                <>
                  <Code2 className="mr-2 h-4 w-4" />
                  Transform Code
                </>
              )}
            </Button>

            {transformedCode && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Transformed Code</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
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
                      lineNumbers: 'on',
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