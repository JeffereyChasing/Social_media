import React, {useState, useEffect} from 'react'
import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import { feedQuery,searchQuery } from '../utils/data'
import Spinner from './Spinner'



const Search = ({searchTerm}) => {
const [pins, setPins] = useState(null)
const [loading, setLoading] = useState(false)


//if no searchTerm show all pins
//if searchTerm exist, show only the pins that has searchTerm as part of the name
useEffect(() => {
  if(searchTerm){
    setLoading(true)
    const query = searchQuery(searchTerm.toLowerCase())
    client.fetch(query).then((data)=>setPins(data))
    setTimeout(()=>setLoading(false),750)

  }else{
    client.fetch(feedQuery).then((data)=>setPins(data))
    setLoading(false)
  }

}, [searchTerm])


  return (
    <div>

      {/**Apply Spinner if the page is currently loading */}
      {loading && <Spinner message = {"Searching for pins"}/>}

      {pins?.length !== 0 &&(<MasonryLayout pins = {pins}/>)}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
          <div className = 'mt-10 text-center text-xl'> 
          
            No Pins Found
          
          </div>


      )}


    </div>
  )
}

export default Search