import { createList } from "../../api/list/create.mjs";
import { toastMessage } from "../../utilities/toastMsg.mjs";
/**
 * Handles the submission of the list creation form and sends the form data to the API to create a new list.
 *
 * @param {Event} e - The form submission event.
 * @returns {Promise<void>}
 */
export async function handleCreateListFormSubmit(e) {
  e.preventDefault();

  const endsAt = e.target.endsAt.value.trim();
  const title = e.target.title.value.trim();
  const description = e.target.description.value.trim();
  const mediaUrl = e.target.mediaUrl.value.trim();
  const mediaAlt = e.target.mediaAlt.value.trim();
  const selectedTags = e.target.tags.value
    ? e.target.tags.value.split(",").map((tag) => tag.trim())
    : [];

  if (!title || !description) {
    toastMessage("Title and body are required.", "alert");
    return;
  }

  const newPost = {
    title: title,
    description: description,
    tags: selectedTags,
    media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt }] : null,
    endsAt: endsAt,
  };

  try {
    const result = await createList(newPost);

    window.location.href = `/post/index.html?singleList=${result.data.id}`;
    toastMessage("List created successfully!", "success");
  } catch (error) {
    console.error("Error:", error);
    toastMessage("Failed to create list: " + error.message, "alert");
  }
}
