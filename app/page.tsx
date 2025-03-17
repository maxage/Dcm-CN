'use client';

import DockerCard from '@/components/docker-card';
import FloatingBar from '@/components/floating-bar';
import SettingsPanel, { type DockerSettings } from '@/components/settings-panel';
import { dockerTools } from '@/lib/docker-tools';
import { useForm } from '@tanstack/react-form';
import { useEffect, useState } from 'react';

// Default settings
const defaultSettings: DockerSettings = {
  configPath: '/opt/appdata/config',
  dataPath: '/opt/appdata/data',
  timezone: 'UTC',
  puid: '1000',
  pgid: '1000',
  umask: '022',
  restartPolicy: 'unless-stopped',
  networkMode: 'bridge',
  useTraefik: false,
  containerNamePrefix: 'docker_',
  preferredImageProvider: 'linuxserver',
};

export default function Home() {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [settings, setSettings] = useState<DockerSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  const form = useForm({
    defaultValues: {
      selectedTools: [] as string[],
      settings: settings,
    },
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value);
    },
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    // Only run in the browser
    if (typeof window !== 'undefined') {
      try {
        // Load selected tools
        const savedTools = localStorage.getItem('dockerComposeSelectedTools');
        if (savedTools) {
          setSelectedTools(JSON.parse(savedTools));
        }

        // Load settings
        const savedSettings = localStorage.getItem('dockerComposeSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        // If there's an error, use default values
        setSelectedTools([]);
        setSettings(defaultSettings);
      }

      setIsLoaded(true);
    }
  }, []);

  // Save selected tools to localStorage when they change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem('dockerComposeSelectedTools', JSON.stringify(selectedTools));
      } catch (error) {
        console.error('Error saving selected tools to localStorage:', error);
      }
    }
  }, [selectedTools, isLoaded]);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem('dockerComposeSettings', JSON.stringify(settings));
      } catch (error) {
        console.error('Error saving settings to localStorage:', error);
      }
    }
  }, [settings, isLoaded]);

  const toggleToolSelection = (toolId: string) => {
    setSelectedTools((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId);
      } else {
        return [...prev, toolId];
      }
    });
  };

  const handleReset = () => {
    // Clear selected tools
    setSelectedTools([]);

    // Reset settings to defaults
    setSettings(defaultSettings);

    // Clear localStorage
    try {
      localStorage.removeItem('dockerComposeSelectedTools');
      localStorage.removeItem('dockerComposeSettings');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background z-0 pointer-events-none motion-safe:animate-fade-in">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/20 blur-3xl motion-safe:animate-float"></div>
          <div className="absolute top-40 right-[15%] w-72 h-72 rounded-full bg-primary/20 blur-3xl motion-safe:animate-float [animation-delay:1s]"></div>
          <div className="absolute bottom-40 left-[20%] w-80 h-80 rounded-full bg-primary/20 blur-3xl motion-safe:animate-float [animation-delay:2s]"></div>
        </div>
      </div>

      <main className="container relative z-10 mx-auto px-4 pt-4">
        <div className="motion-safe:animate-slide-down [animation-delay:300ms]">
          <SettingsPanel settings={settings} onSettingsChange={setSettings} />
        </div>

        {/* FloatingBar with search button */}
        <FloatingBar
          selectedCount={selectedTools.length}
          selectedTools={selectedTools.map((id) => dockerTools.find((tool) => tool.id === id)?.name || '')}
          selectedToolIds={selectedTools}
          settings={settings}
          onReset={handleReset}
          onToggleToolSelection={toggleToolSelection}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-7 gap-4">
          {dockerTools.map((tool) => (
            <div key={tool.id} className="h-full">
              <DockerCard
                tool={tool}
                isSelected={selectedTools.includes(tool.id)}
                onSelect={() => toggleToolSelection(tool.id)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
