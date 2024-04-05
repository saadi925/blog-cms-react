import { Category } from "./CategoryList";
import DeleteIcon from "../../assets/DeleteIcon";
import EditIcon from "../../assets/EditIcon";
import { darkTheme } from "../../theme/COLORS";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../setup/store/categoryApi";
import { deleteCategoryById, updateCategoryData } from "../../setup/store/slices/dataSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const CategoryCard = ({ category, handleSelected }: { category: Category , handleSelected : (category : Category)=> void}) => {
  const dispatch = useDispatch();
  const [deleteCategory, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();
const [updateCategory, { isLoading: updateLoading }] = useUpdateCategoryMutation()
  const handleCategoryDelete = async (id: number) => {
    try {
      const deleted = await deleteCategory(id).unwrap();
      dispatch(deleteCategoryById(deleted.id));
    } catch (error) {
      console.log(error);
    }
  };
  const [isEditing, setEditing] = useState(false)
 const {description} = category

  const shortDescription = description && description.length > 100 ? `${description.slice(0, 100)}...` : description
  const [editData , setEditData] = useState({
    name: category.name,
    description: category.description,
    thumbnail: category.thumbnail
  })
  const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setEditData({
      ...editData,
      [name]: value
    })
  }
  const editSubmit = async () => {
    try {
    const cat =  await updateCategory({
        name: editData.name,
        description: editData.description,
        thumbnail: editData.thumbnail,
        id: category.id
      }).unwrap()
      dispatch(updateCategoryData(cat))
      setEditing(false)
    } catch (error) {
      
    }
  }
 const invalidThumbnail = editData.thumbnail == '' || !editData.thumbnail || !editData.thumbnail.startsWith('https://')
 return (
    <div className="mb-4">
      <div
        className="bg-background relative rounded-lg"
      >
        {isEditing ? <div className="relative">
        <img
            src={! invalidThumbnail? editData.thumbnail: category.thumbnail}
            alt={category.name}
            className="w-full h-52 object-cover rounded-t-md "
          />
              <input placeholder="Thumbnail" name="thumbnail" value={editData.thumbnail} onChange={(e)=> handleEdit(e)} className="py-2 px-3 bg-primary/80 outline-none border-t border-surface  absolute bottom-0 placeholder:text-surface text-white w-full  right-0 z-10"/>
        </div> :category.thumbnail && (
          <img
            src={category.thumbnail}
            alt={category.name}
            className="w-full h-52 object-cover rounded-t-md"
          />
        )}

        <div className="bg-white rounded-b-md p-4 " >
        {isEditing ? 
         <div className="">
          <input placeholder="Name" name="name" value={editData.name} onChange={(e)=> handleEdit(e)} className="py-2 px-3 bg-primary/10  w-full"/>
          <textarea placeholder="Description" name="description" value={editData.description} onChange={(e)=> handleEdit(e)} className="py-2 px-3 bg-primary/10 w-full mt-2"/>
         </div>

        :<div className="cursor-pointer group " onClick={()=>handleSelected(category)}>
        <h3 className="text-lg font-semibold group-hover:text-surface" >
            {category.name}
          </h3>
          <p className="text-sm text-gray-600 group-hover:text-black">{shortDescription}</p>
        </div>}

        <div className="flex justify-end mt-4 gap-2">
         {isEditing ? <>
          <button
              className="hover:bg-gray-200 rounded-full p-2 ml-2"
              onClick={()=>setEditing(false)}
            >
             Cancel
            </button>
        <button
             disabled={updateLoading}
              className="hover:bg-gray-200 bg-primary rounded-md  disabled:bg-black text-surface  py-2 px-5 font-semibold"
              onClick={() => editSubmit()}
            >
              Save

            </button>
            

         </> :
          
  <>       
         <button
              className="hover:bg-gray-200 rounded-full p-2 ml-2"
              onClick={()=>setEditing(!isEditing)}
            >
              <EditIcon size={24} fill={darkTheme.COLORS.primary} />
            </button>
        <button
              disabled={deleteLoading}
              className="hover:bg-gray-200 rounded-full disabled:bg-black  p-2"
              onClick={() => handleCategoryDelete(category.id)}
            >
              <DeleteIcon size={24} fill={darkTheme.COLORS.error} />

            </button>
            
            </>
}
</div>
        
        </div>
      </div>
    </div>
  );
};






export default CategoryCard;
