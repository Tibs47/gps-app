import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async (req: Request) => {
  const url = new URL(req.url);
  const lat = url.searchParams.get("latt");
  const lon = url.searchParams.get("long");

  if (!lat || !lon) {
    return new Response("Missing parameters", { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error } = await supabase.from("coordinates").insert({
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
  });

  if (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }

  return new Response("Success", { status: 200 });
});
