// src\app\[locale]\page.tsx

import { redirect } from "next/navigation";
import { headers } from "next/headers";

async function getLink(name) {
  // Get the host from headers instead of using env variable
  const headersList = headers();
  const host = headersList.get("host");
  const proto = process.env.NODE_ENV === "production" ? "https" : "http";
  const apiUrl = `${proto}://${host}`;

  try {
    const response = await fetch(
      `https://www.darbproductions.com/api/link?name=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      throw new Error("Link not found");
    }
    const data = await response.json();
    return data.link;
  } catch (error) {
    console.error("Error fetching link:", error);
    return null;
  }
}

export default async function Page({ params }) {
  // Await and validate params
  const linkNameRaw = await params?.linkName;
  const linkName = linkNameRaw ? decodeURIComponent(linkNameRaw) : linkNameRaw;
  console.log(`linkName`, linkName);
  if (!linkName) {
    redirect("/");
  }

  // Fetch the actual URL from the database
  const actualLink = await getLink(linkName);

  if (!actualLink) {
    redirect("/");
  }

  // Make sure the URL has a protocol
  const url = actualLink.startsWith("http")
    ? actualLink
    : `https://${actualLink}`;

  redirect(url);
}
