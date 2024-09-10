"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import pinyin from "pinyin";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

type ProjectType = {
  id: string;
  name: string;
  slug: string;
  color: string;
};

const projectColors = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

export default function ProjectSwitcher({
  large = false,
}: {
  large?: boolean;
}) {
  const { data: session, status } = useSession();
  const [openPopover, setOpenPopover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [selected, setSelected] = useState<ProjectType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProjects();
    }
  }, [status]);

  useEffect(() => {
    if (projects.length === 0 && !loading) {
      setOpenPopover(true);
    }
  }, [projects, loading]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/projects");
      if (resp.ok) {
        const respJson = await resp.json();
        respJson.data.forEach((project: ProjectType, index: number) => {
          project.color =
            project.color || projectColors[index % projectColors.length];
        });
        setProjects(respJson.data);
        if (respJson.data.length > 0) {
          setSelected(respJson.data[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ProjectSwitcherPlaceholder />;
  }

  return (
    <div>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger>
          <Button
            className="h-8 px-2"
            variant={openPopover ? "secondary" : "ghost"}
            onClick={() => setOpenPopover(!openPopover)}
          >
            <div className="flex items-center space-x-3 pr-2">
              <div
                className={cn(
                  "size-3 shrink-0 rounded-full",
                  selected?.color || "bg-red-500",
                )}
              />
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "inline-block truncate text-sm font-medium xl:max-w-[120px]",
                    large ? "w-full" : "max-w-[80px]",
                  )}
                >
                  {selected?.name || "New Project"}
                </span>
              </div>
            </div>
            <ChevronsUpDown
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="max-w-60 p-2">
          <ProjectList
            selected={selected as ProjectType}
            projects={projects}
            setOpenPopover={setOpenPopover}
            setShowModal={setShowModal}
            setSelected={setSelected}
          />
        </PopoverContent>
      </Popover>
      {showModal && (
        <CreateProjectModal
          showModal={showModal}
          setShowModal={setShowModal}
          onProjectCreated={(newProject) => {
            setProjects([...projects, newProject]);
            setSelected(newProject);
          }}
        />
      )}
    </div>
  );
}

function ProjectList({
  selected,
  projects,
  setOpenPopover,
  setShowModal,
  setSelected,
}: {
  selected: ProjectType;
  projects: ProjectType[];
  setOpenPopover: (open: boolean) => void;
  setShowModal: (show: boolean) => void;
  setSelected: (project: ProjectType) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      {projects.length === 0 ? (
        <div className="mb-2 text-center text-sm text-muted-foreground">
          You don&apos;t have any projects yet. Create a new one to get started.
        </div>
      ) : (
        projects.map((project) => (
          <Button
            key={project.id}
            variant="ghost"
            className={cn(
              "relative flex h-9 w-full items-center justify-start px-2 py-1 text-sm",
              "bg-transparent hover:bg-accent hover:text-accent-foreground",
              selected?.id === project.id
                ? "bg-accent text-accent-foreground"
                : "",
              "text-foreground transition-colors",
            )}
            onClick={() => {
              setSelected(project);
              setOpenPopover(false);
            }}
          >
            <div className="flex flex-1 items-center gap-2">
              <div
                className={cn("size-3 shrink-0 rounded-full", project.color)}
              />
              <span className="truncate text-sm font-medium">
                {project.name}
              </span>
            </div>
            {selected?.id === project.id && (
              <Check size={18} className="ml-2 shrink-0" />
            )}
          </Button>
        ))
      )}
      <Button
        variant="outline"
        className="relative flex h-9 items-center justify-center gap-2 p-2"
        onClick={() => {
          setOpenPopover(false);
          setShowModal(true);
        }}
      >
        <Plus size={18} className="shrink-0" />
        <span className="flex-1 truncate text-center">New Project</span>
      </Button>
    </div>
  );
}

function CreateProjectModal({
  showModal,
  setShowModal,
  onProjectCreated,
}: {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onProjectCreated: (project: ProjectType) => void;
}) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const generateKey = (projectName: string) => {
    const pinyinResult = pinyin(projectName, {
      style: pinyin.STYLE_NORMAL,
      heteronym: false,
    })
      .flat()
      .join("");
    return pinyinResult
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 8);
  };

  const handleCreateProject = async () => {
    try {
      const resp = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          key: generateKey(projectName),
          description: projectDescription,
        }),
      });
      const respJson = await resp.json();
      if (respJson.code === 200) {
        respJson.data.color =
          projectColors[Math.floor(Math.random() * projectColors.length)];
        onProjectCreated(respJson.data);
        setShowModal(false);
        setProjectName("");
        setProjectDescription("");
        return;
      }
      if (respJson.message) {
        toast.error(respJson.message);
      } else {
        toast.error("Failed to create project");
      }
    } catch (error) {
      toast.error("Failed to create project:", error);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">New Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <label htmlFor="projectName" className="col-span-4 text-left">
              Name
            </label>
            <Input
              id="projectName"
              value={projectName}
              placeholder="Enter project name"
              onChange={(e) => setProjectName(e.target.value)}
              className="col-span-4"
            />
          </div>
          <div className="grid items-center gap-4">
            <label
              htmlFor="projectDescription"
              className="col-span-4 text-left"
            >
              Description
            </label>
            <Textarea
              id="projectDescription"
              value={projectDescription}
              placeholder="Enter project description"
              onChange={(e) => setProjectDescription(e.target.value)}
              className="col-span-4"
              rows={3}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleCreateProject}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProjectSwitcherPlaceholder() {
  return (
    <div className="flex animate-pulse items-center space-x-1.5 rounded-lg px-1.5 py-2 sm:w-60">
      <div className="h-8 w-36 animate-pulse rounded-md bg-muted xl:w-[180px]" />
    </div>
  );
}
