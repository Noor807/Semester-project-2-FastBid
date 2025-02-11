/**
 * Passes data to the createPost function in api/post and handles the response
 */

import { deleteAuction } from "../../api/list/delete";

export async function onDeletePost(event) {
  event.preventDefault();

  const button = event.target;
  const id = button.dataset.id;
  const token = localStorage.getItem('token')
  if (!id) {
    console.error("Post ID not found.");
    return;
  }

  const confirmation = confirm("Are you sure you want to delete this post?");
  if (!confirmation) return;

  try {
    const result = await deleteAuction(id , token);
    
    
    if (result.success)  {
      window.location.href = "/";
    alert('remove list successfully');
       
    }else{
      console.error("Failed to delete post:", result.error);
    alert("Error: Could not delete the post.");

    }
   
  } catch (error) {
    console.error("Unexpected error:", error);
    alert("Error: Could not delete the post.");

  }
}
