import React, {useState, useEffect} from 'react'
import {AioutlineLogout} from 'react-icons/ai'
import {useNavigate,useParams} from 'react-router-dom'
import {GoogleLogout} from 'react-google-login'
import {userCreatedPinsQuery,userQuery,userSavedPinsQuery} from '../utils/data'
import {client} from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'



const UserProfile = () => {
  return (
    <div>
        UserProfile
    </div>
  )
}

export default UserProfile