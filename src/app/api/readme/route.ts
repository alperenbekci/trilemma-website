import {
  credits,
  fallback,
  link,
  main,
  top,
} from "@/app/api/readme/components";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const theme = (searchParams.get("theme") ?? "light") as "light" | "dark";
  const section = searchParams.get("section") ?? "";
  const index = searchParams.get("i") ?? "";
  let content = ".";

  if (section === "top") {
    content = top({ height: 20, theme });
  } else if (section === "link-website" && index === "1") {
    content = link({ height: 20, width: 100, theme, index: Number(index) })(
      "Portfolio"
    );
  } else if (section === "link-linkedin" && index === "2") {
    content = link({ height: 20, width: 100, theme, index: Number(index) })(
      "LinkedIn"
    );
  } else if (section === "link-twitter" && index === "3") {
    content = link({ height: 20, width: 100, theme, index: Number(index) })(
      "Twitter (X)"
    );
  } else if (section === "fallback") {
    content = fallback({ height: 180, width: 420, theme });
  } else if (section === "credits") {
    content = credits({ height: 25, theme });
  } else {
    content = main({ height: 250, theme });
  }

  return new Response(content, {
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      pragma: "no-cache",
      expires: "0",
    },
  });
}
