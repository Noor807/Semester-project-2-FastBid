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
<<<<<<< HEAD
    console.error("listID not found.");
    return;
  }

  const confirmation = confirm("Are you sure you want to delete this list?");
=======
    console.error("Post ID not found.");
    return;
  }

  const confirmation = confirm("Are you sure you want to delete this post?");
>>>>>>> d2529e3fa30724d20abb14ad11292d996ff427d9
  if (!confirmation) return;

  try {
    const result = await deleteAuction(id , token);
    
    
    if (result.success)  {
      window.location.href = "/";
    alert('remove list successfully');
       
    }else{
<<<<<<< HEAD
      console.error("Failed to delete list:", result.error);
    alert("Error: Could not delete the list.");
=======
      console.error("Failed to delete post:", result.error);
    alert("Error: Could not delete the post.");
>>>>>>> d2529e3fa30724d20abb14ad11292d996ff427d9

    }
   
  } catch (error) {
    console.error("Unexpected error:", error);
<<<<<<< HEAD
    alert("Error: Could not delete the list.");
=======
    alert("Error: Could not delete the post.");
>>>>>>> d2529e3fa30724d20abb14ad11292d996ff427d9

  }
}
