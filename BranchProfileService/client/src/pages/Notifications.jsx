import { Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Notifications() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-xl">Notifications</CardTitle>
          <CardDescription>You have 3 unread notifications</CardDescription>
        </div>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-start gap-4 rounded-lg border p-3 bg-primary/5">
          <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
          <div className="grid gap-1">
            <div className="flex items-center">
              <p className="text-sm font-medium">New message from Sarah</p>
              <Badge variant="outline" className="ml-2 text-xs">
                New
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Hey, are we still meeting for coffee tomorrow?</p>
            <p className="text-xs text-muted-foreground">2 minutes ago</p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-lg border p-3">
          <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
          <div className="grid gap-1">
            <div className="flex items-center">
              <p className="text-sm font-medium">Project deadline reminder</p>
              <Badge variant="outline" className="ml-2 text-xs">
                New
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">The project submission deadline is in 2 days.</p>
            <p className="text-xs text-muted-foreground">1 hour ago</p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-lg border p-3">
          <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
          <div className="grid gap-1">
            <div className="flex items-center">
              <p className="text-sm font-medium">System update</p>
              <Badge variant="outline" className="ml-2 text-xs">
                New
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              The system will be down for maintenance tonight from 2-4 AM.
            </p>
            <p className="text-xs text-muted-foreground">3 hours ago</p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-lg border p-3">
          <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-muted" />
          <div className="grid gap-1">
            <p className="text-sm font-medium">Weekly report available</p>
            <p className="text-sm text-muted-foreground">Your weekly analytics report is now available for download.</p>
            <p className="text-xs text-muted-foreground">Yesterday</p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-lg border p-3">
          <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-muted" />
          <div className="grid gap-1">
            <p className="text-sm font-medium">New feature released</p>
            <p className="text-sm text-muted-foreground">Check out our latest feature: dark mode is now available!</p>
            <p className="text-xs text-muted-foreground">2 days ago</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
