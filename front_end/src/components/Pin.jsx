import React from 'react'
import {urlFor,client} from '../client'
import {Link,useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {MdDownload, MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import {useState,useEffect} from 'react';
import { fetchUser } from '../utils/fetchUser';




const Pin = ({pin:{postedBy,image,_id,destination,save}}) => {
  
  const [postHovered, setPostHovered] = useState(false)
  const navigate = useNavigate()
  const user = fetchUser();
  const alreadySaved = !!(save?.filter((item) => item.postedBy._id ===user.googleId))?.length;
  /* check whether the user (by googleId) already saved the pin*/
  /* !! turn alreadySaved into boolean values*/
  /* ?.length to avoid error because a pin may not be saved at all (.save = null)*/


  const savePin = (id) => {
    if (!alreadySaved) {
        client.patch(id).setIfMissing({save:[]}).insert("after",'save[-1]',[{
          key:uuidv4(),
          userId: user.googleId,
          postedBy:{
            _type:'postedBy',
            _ref: user.googleId
          }
        }]).commit().then(()=>{
          window.location.reload();
        } );
    }

  }

  return (
    <div className = 'm-2'>


      <div onMouseEnter = {()=>setPostHovered(true)}onMouseLeave=  {()=>setPostHovered(false)} onClick = {()=>navigate(`/pin-detail/${_id}`)} className = 'relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'>
        
          <img className = 'rounded-lg w-full' alt = 'user-post' src ={urlFor(image).width(250).url()}/>
          
          {postHovered && (
            <div className = 'absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50' style ={{height:'100%'}}>
              <div className = 'flex items-center justify-between'>


                {/*Download button*/}
                <div className = 'flex gap-2'>
                  <a href = {`${image?.asset?.url}?dl=`} download onClick = {(e)=>e.stopPropagation()}

                  /*stopPropogation is to stop the extra navigation to pindetail after download*/

                  className ='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 shadow-md outline-none'>
                  <MdDownloadForOffline/>
                  </a>
                </div>


                {/*Saved button*/}
                {alreadySaved ? (
                  <button type = "button" className = "bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-based rounded-3xl hover:sahdow-md outline-none">
                    {save?.length} Saved
                  </button>
                ):(
                  <button onClick = {(e)=>{ e.stopPropagation();savePin(_id);}}
                  type = "button" className = "bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-based rounded-3xl hover:sahdow-md outline-none">
                    Save
                  </button>
                )}
              </div>
                
                {/*destination button*/}
              <div className = 'flex justify-between items-center gap-2 w-full'>
                  {destination && (
                    <a href = {destination} target = 'blank' rel = 'noreferrer' 
                    className = 'bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
                        <BsFillArrowUpRightCircleFill/>
                        {destination.length > 20 ? destination.slice(8,20): destination.slice(8) }
                      </a>
                  )}
              </div>





            </div>
          )}
      </div>   
    </div>
  )
}

export default Pin