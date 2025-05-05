import React, { Suspense, lazy } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Lazy load form components
const ProfileForm = lazy(() => import("../components/Settings/ProfileForm"));
const NotificationsForm = lazy(() => import("../components/Settings/NotificationsForm"));
const AppearanceForm = lazy(() => import("../components/Settings/AppearanceForm"));

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
});

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(false),
  weeklyDigest: z.boolean().default(true),
  newTagAlerts: z.boolean().default(true),
});

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  fontSize: z.enum(["sm", "md", "lg"]),
  colorScheme: z.enum(["default", "purple", "blue", "green"]),
});

const SettingsPage = () => {
  const { theme, fontSize, colorScheme, setTheme, setFontSize, setColorScheme } = useTheme();

  // Form instances can be created inside the lazy loaded components

  function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    toast.success("Profile updated successfully", {
      description: "Your profile information has been saved.",
    });
  }

  function onNotificationsSubmit(data: z.infer<typeof notificationsFormSchema>) {
    toast.success("Notification preferences updated", {
      description: "Your notification settings have been saved.",
    });
  }

  function onAppearanceSubmit(data: z.infer<typeof appearanceFormSchema>) {
    setTheme(data.theme);
    setFontSize(data.fontSize);
    setColorScheme(data.colorScheme);
    
    toast.success("Appearance settings updated", {
      description: "Your appearance preferences have been saved.",
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <Suspense fallback={<div>Loading Profile...</div>}>
          <TabsContent value="profile">
            <ProfileForm onSubmit={onProfileSubmit} />
          </TabsContent>
        </Suspense>

        <Suspense fallback={<div>Loading Notifications...</div>}>
          <TabsContent value="notifications">
            <NotificationsForm onSubmit={onNotificationsSubmit} />
          </TabsContent>
        </Suspense>

        <Suspense fallback={<div>Loading Appearance...</div>}>
          <TabsContent value="appearance">
            <AppearanceForm onSubmit={onAppearanceSubmit} />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
