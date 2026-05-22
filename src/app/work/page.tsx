import { redirect } from "next/navigation";

import { WORK_PROJECTS } from "@/lib/work-projects";

export default function WorkIndexPage() {
  // Land on the first project page by default.
  redirect(`/work/${WORK_PROJECTS[0].slug}`);
}
