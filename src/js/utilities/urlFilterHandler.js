export function urlFilterHandler() {
    
const selectedTag = document.getElementById("categories")?.value.toLowerCase() || "";

  if (!selectedTag) {
    return null;
  }

  return selectedTag;
}