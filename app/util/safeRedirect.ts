export function safeRedirect(
    to: FormDataEntryValue | string | null | undefined,
    defaultRedirect: string = "/app"
  ) {
    if (!to || typeof to !== "string") {
      return defaultRedirect;
    }
  
    if (!to.startsWith("/") || to.startsWith("//")) {
      return defaultRedirect;
    }
  
    return to;
  }