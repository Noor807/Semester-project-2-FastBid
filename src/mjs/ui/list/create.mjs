import { createList } from "../../api/list/create";
import { toastMessage } from "../../utilities/toastMsg.mjs";


  // Handle form submission for creating a new list
  export async function handleCreateListFormSubmit(e) {
    e.preventDefault(); // Prevent form from submitting normally
    const endsAt  = e.target.endsAt.value.trim();
    const title = e.target.title.value.trim();
    const description = e.target.description.value.trim();
    const mediaUrl = e.target.mediaUrl.value.trim();
    const mediaAlt = e.target.mediaAlt.value.trim();
    const selectedTags = e.target.tags.value
      ? e.target.tags.value.split(",").map((tag) => tag.trim())
      : [];
  
    if (!title || !description) {
      alert("Title and body are required.");
      return;
    }
    const token = localStorage.getItem('token') 
  
    const newPost = {
      title: title,
     description: description,
      tags: selectedTags,
      media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt }]: null,
      endsAt: endsAt, 
    };
  
  
    try {
      const result = await createList(newPost , token);
    
      window.location.href = `/post/index.html?singleList=${result.data.id} `
      toastMessage("list created successfully!" , 'success');
    } catch (error) {
      console.error("Error:", error);
      toastMessage("Failed to create list: " + error.message);
    }
  }
  