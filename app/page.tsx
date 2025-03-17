'use client';

import DockerCard from '@/components/docker-card';
import FloatingBar from '@/components/floating-bar';
import SettingsPanel, { type DockerSettings } from '@/components/settings-panel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dockerTools } from '@/lib/docker-tools';
import { useForm } from '@tanstack/react-form';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [settings, setSettings] = useState<DockerSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

        // Load search term (optional)
        const savedSearchTerm = localStorage.getItem('dockerComposeSearchTerm');
        if (savedSearchTerm) {
          setSearchTerm(savedSearchTerm);
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        // If there's an error, use default values
        setSelectedTools([]);
        setSettings(defaultSettings);
        setSearchTerm('');
      }

      setIsLoaded(true);

      // Focus search input after component is mounted
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
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

  // Save search term to localStorage when it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem('dockerComposeSearchTerm', searchTerm);
      } catch (error) {
        console.error('Error saving search term to localStorage:', error);
      }
    }
  }, [searchTerm, isLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingBar(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleToolSelection = (toolId: string) => {
    setSelectedTools((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId);
      } else {
        return [...prev, toolId];
      }
    });
  };

  const filteredTools = dockerTools.filter((tool) => tool.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleReset = () => {
    // Clear selected tools
    setSelectedTools([]);

    // Reset settings to defaults
    setSettings(defaultSettings);

    // Clear search term
    setSearchTerm('');

    // Clear localStorage
    try {
      localStorage.removeItem('dockerComposeSelectedTools');
      localStorage.removeItem('dockerComposeSettings');
      localStorage.removeItem('dockerComposeSearchTerm');
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

      <main className="container relative z-10 mx-auto px-4 py-12">
        <div className="relative mb-8 max-w-5xl mx-auto motion-safe:animate-slide-down [animation-delay:450ms]">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground text-sm">
              <Search />
            </span>
          </div>
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Search for tools..."
            className="pl-10 w-full shadow-sm transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:scale-[1.01]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        <div className="motion-safe:animate-slide-down [animation-delay:300ms]">
          <SettingsPanel settings={settings} onSettingsChange={setSettings} />
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12 motion-safe:animate-scale-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4 motion-safe:animate-bounce-subtle">
              <span className="text-2xl">
                <Search fill="currentColor" />
              </span>
            </div>
            <h3 className="text-xl font-medium mb-2">No tools found</h3>
            <p className="text-muted-foreground">Try adjusting your search or browse all available tools</p>
            {searchTerm && (
              <Button
                variant="outline"
                className="mt-4 motion-safe:animate-slide-up [animation-delay:150ms]"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTools.map((tool, index) => (
              <div key={tool.id} className="h-full">
                <DockerCard
                  tool={tool}
                  isSelected={selectedTools.includes(tool.id)}
                  onSelect={() => toggleToolSelection(tool.id)}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <FloatingBar
        show={selectedTools.length > 0}
        selectedCount={selectedTools.length}
        selectedTools={selectedTools.map((id) => dockerTools.find((tool) => tool.id === id)?.name || '')}
        settings={settings}
        onReset={handleReset}
      />
    </div>
  );
}
