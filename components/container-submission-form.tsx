'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TagsInput } from '@/components/ui/tags-input';
import { Textarea } from '@/components/ui/textarea';
import { dockerTools } from '@/lib/docker-tools';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { HelpCircle, PlusCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const CATEGORIES = [
  'Media',
  'Management',
  'Networking',
  'Storage',
  'Database',
  'Monitoring',
  'Home Automation',
  'Security',
  'Development',
];

// Collect all unique tags from existing tools
const ALL_TAGS = Array.from(new Set(dockerTools.flatMap((tool) => tool.tags))).sort();

const formSchema = z.object({
  id: z.string().min(1, 'Container ID is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  githubUrl: z.string().url().optional().or(z.literal('')),
  containerData: z.string().min(1, 'Container definition is required'),
});

type FormValues = z.infer<typeof formSchema>;

export function ContainerSubmissionForm() {
  const [open, setOpen] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      name: '',
      description: '',
      category: '',
      tags: [],
      githubUrl: '',
      containerData: '',
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    setOpen(false);
  }

  // Function to filter tag suggestions based on existing selected tags and input value
  const getTagSuggestions = (inputValue: string, selectedTags: string[]) => {
    const filteredTags = ALL_TAGS.filter(
      (tag) =>
        // Filter out already selected tags
        !selectedTags.includes(tag) &&
        // Filter by input value if it exists
        (inputValue === '' || tag.toLowerCase().includes(inputValue.toLowerCase()))
    );

    return filteredTags;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group relative overflow-hidden bg-primary-foreground/15 hover:bg-primary-foreground/25 border-primary-foreground/30 text-primary-foreground font-medium px-4 py-2 motion-safe:animate-slide-in-right [animation-delay:300ms] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
        >
          <span className="relative z-10 flex items-center gap-2">
            <PlusCircle size={18} />
            <span>Suggest a new container</span>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Container</DialogTitle>
          <DialogDescription>
            Creating a submission will redirect you to creating an issue on GitHub, pre-filled with this form. The
            submission will then be reviewed by the maintainers and added to the list of containers if accepted.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Container ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., sonarr, postgres" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Display name (e.g., Sonarr, PostgreSQL)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the container's purpose" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>GitHub URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/username/repo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <TagsInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Add tags and press Enter"
                        maxItems={10}
                      />
                      {field.value.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          <p className="text-xs text-muted-foreground mb-1 w-full">Suggestions:</p>
                          {getTagSuggestions('', field.value)
                            .slice(0, 5)
                            .map((tag) => (
                              <Button
                                key={tag}
                                variant="outline"
                                size="sm"
                                type="button"
                                onClick={() => field.onChange([...field.value, tag])}
                                className="h-6 text-xs px-2 py-0"
                              >
                                {tag}
                              </Button>
                            ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>Add related tags and press Enter after each tag</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="containerData"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel>Docker Compose Service Definition</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowExample(!showExample)}
                      className="h-6 w-6"
                    >
                      {showExample ? <X size={16} /> : <HelpCircle size={16} />}
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the service definition in YAML format"
                      className="font-mono min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  {showExample && (
                    <div className="p-4 bg-muted rounded-md text-sm">
                      <h4 className="font-medium mb-2">Example Format:</h4>
                      <pre className="whitespace-pre-wrap text-xs">
                        {`services:
  sonarr:
    container_name: sonarr
    image: ghcr.io/hotio/sonarr
    ports:
      - "8989:8989"
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - UMASK=\${UMASK}
      - TZ=\${TZ}
    volumes:
      - \${CONFIG}/sonarr:/config
      - \${DATA}/data:/data`}
                      </pre>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Submit Container
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
