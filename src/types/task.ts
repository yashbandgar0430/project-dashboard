export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "progress" | "done";
}