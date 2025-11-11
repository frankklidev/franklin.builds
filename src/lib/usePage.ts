import { useEffect } from "react";

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    if (!title) return;
    const prev = document.title;
    document.title = title;
    return () => { document.title = prev; };
  }, [title]);
}

export function useMeta(name: string, content: string) {
  useEffect(() => {
    let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }
    const prev = tag.getAttribute("content");
    tag.setAttribute("content", content);
    return () => {
      if (prev === null) tag?.remove();
      else tag?.setAttribute("content", prev);
    };
  }, [name, content]);
}

// Si quieres OpenGraph:
export function useOG(property: string, content: string) {
  useEffect(() => {
    let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    const prev = tag.getAttribute("content");
    tag.setAttribute("content", content);
    return () => {
      if (prev === null) tag?.remove();
      else tag?.setAttribute("content", prev);
    };
  }, [property, content]);
}