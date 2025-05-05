
import React, { useState } from "react";
import { X, PlusCircle, Check, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TagManagerProps {
  isOpen: boolean;
  onClose: () => void;
  editMode?: boolean;
  tagData?: {
    name: string;
    description: string;
    color: string;
    type: string;
    visibility: string;
  };
}

const TagManager: React.FC<TagManagerProps> = ({
  isOpen,
  onClose,
  editMode = false,
  tagData
}) => {
  const [tag, setTag] = useState({
    name: tagData?.name || "",
    description: tagData?.description || "",
    color: tagData?.color || "blue",
    type: tagData?.type || "personal",
    visibility: tagData?.visibility || "private"
  });

  const colorOptions = [
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Purple", value: "purple" },
    { label: "Yellow", value: "yellow" },
    { label: "Red", value: "red" },
    { label: "Orange", value: "orange" },
    { label: "Gray", value: "gray" }
  ];

  const handleSubmit = () => {
    console.log("Saving tag:", tag);
    // Here we would save the tag
    onClose();
  };

  const handleDelete = () => {
    console.log("Deleting tag:", tag);
    // Here we would delete the tag
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col bg-background shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-medium">
                {editMode ? "Edit Tag" : "Create New Tag"}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Tag Name */}
              <div>
                <Label htmlFor="tag-name">Tag Name</Label>
                <Input
                  id="tag-name"
                  value={tag.name}
                  onChange={(e) => setTag({ ...tag, name: e.target.value })}
                  className="mt-1"
                  placeholder="Enter tag name"
                />
              </div>
              
              {/* Tag Description */}
              <div>
                <Label htmlFor="tag-description">Description</Label>
                <Textarea
                  id="tag-description"
                  value={tag.description}
                  onChange={(e) => setTag({ ...tag, description: e.target.value })}
                  className="mt-1 resize-none"
                  placeholder="Enter tag description (optional)"
                  rows={3}
                />
              </div>
              
              {/* Tag Color */}
              <div>
                <Label>Tag Color</Label>
                <div className="mt-2 grid grid-cols-7 gap-2">
                  {colorOptions.map((color) => (
                    <div
                      key={color.value}
                      className={cn(
                        `tag-${color.value}`,
                        "h-8 w-8 rounded-full flex items-center justify-center cursor-pointer",
                        tag.color === color.value ? "ring-2 ring-primary ring-offset-2" : ""
                      )}
                      onClick={() => setTag({ ...tag, color: color.value })}
                    >
                      {tag.color === color.value && <Check size={14} />}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tag Type */}
              <div>
                <Label>Tag Type</Label>
                <RadioGroup
                  value={tag.type}
                  onValueChange={(value) => setTag({ ...tag, type: value })}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="personal" id="personal" />
                    <Label htmlFor="personal">Personal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" />
                    <Label htmlFor="team">Team</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="global" id="global" />
                    <Label htmlFor="global">Global</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Tag Visibility */}
              <div>
                <Label htmlFor="visibility">Visibility</Label>
                <Select
                  value={tag.visibility}
                  onValueChange={(value) => setTag({ ...tag, visibility: value })}
                >
                  <SelectTrigger id="visibility" className="mt-1">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="shared">Shared with Team</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Preview */}
              <div>
                <Label>Preview</Label>
                <div className="mt-2 p-4 border rounded-md bg-card">
                  <div className="flex items-center">
                    <span className={cn("tag", `tag-${tag.color}`)}>
                      {tag.name || "Tag Name"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t p-4">
              {editMode ? (
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex items-center"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              )}
              <Button onClick={handleSubmit} className="flex items-center">
                {!editMode && <PlusCircle size={16} className="mr-2" />}
                {editMode ? "Save Changes" : "Create Tag"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagManager;
