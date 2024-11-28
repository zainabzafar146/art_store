import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_ANON_KEY as string;

export const supabase = createClient(
  "https://xzcwwxmmaixeoszjsebu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Y3d3eG1tYWl4ZW9zempzZWJ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDg4NDkzNCwiZXhwIjoyMDQwNDYwOTM0fQ.gVjsXvn66I_RBwSpriF4Ikm9duPdZC85VGGkzurTukM"
);
